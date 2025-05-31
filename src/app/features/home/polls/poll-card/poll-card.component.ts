import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Poll } from '../../../../core/polls/poll.service';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../core/shared/button/button.component';

@Component({
  selector: 'app-poll-card',
  standalone: true,
  imports: [DatePipe, RouterLink, ButtonComponent],
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.scss'],
})
export class PollCardComponent implements OnInit {
  @Input() poll!: Poll;
  status: string = '';
  statusClass: string = '';

  ngOnInit() {
    this.calculateStatus();
  }

  private calculateStatus() {
    const now = new Date();
    const startDate = new Date(this.poll.start_date);
    const endDate = new Date(this.poll.end_date);

    if (now < startDate) {
      this.status = 'Não iniciada';
      this.statusClass = 'not-started';
    } else if (now >= startDate && now <= endDate) {
      this.status = 'Em andamento';
      this.statusClass = 'in-progress';
    } else {
      this.status = 'Finalizada';
      this.statusClass = 'finished';
    }
  }
}
