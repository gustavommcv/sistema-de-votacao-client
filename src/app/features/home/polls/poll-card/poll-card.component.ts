import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { getPollStatus, type Poll } from '../../../../core/models/poll.model';
import { ButtonComponent } from '../../../../core/shared/button/button.component';
import { AuthService } from '../../../../core/auth/auth.service';
import { PollService } from '../../../../core/polls/poll.service';

@Component({
  selector: 'app-poll-card',
  standalone: true,
  imports: [DatePipe, ButtonComponent],
  templateUrl: './poll-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./poll-card.component.scss'],
})
export class PollCardComponent implements OnInit {
  @Input() poll!: Poll;
  @Output() readonly pollDeleted = new EventEmitter<number>();
  status: string = '';
  statusClass: string = '';
  isDeleting = false;

  constructor(
    public authService: AuthService,
    private pollService: PollService,
  ) { }

  ngOnInit() {
    this.calculateStatus();
  }

  private calculateStatus() {
    const status = getPollStatus(this.poll);
    if (status === 'not-started') {
      this.status = 'Não iniciada';
      this.statusClass = 'not-started';
    } else if (status === 'in-progress') {
      this.status = 'Em andamento';
      this.statusClass = 'in-progress';
    } else {
      this.status = 'Finalizada';
      this.statusClass = 'finished';
    }
  }

  deletePoll(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Tem certeza que deseja deletar esta enquete?')) {
      this.isDeleting = true;
      this.pollService.deletePoll(id).subscribe({
        next: () => {
          this.pollDeleted.emit(id);
        },
        error: () => {
          this.isDeleting = false;
        },
      });
    }
  }
}
