import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PollService } from '../../../core/polls/poll.service';
import { CommonModule } from '@angular/common';
import { PollCardComponent } from '../polls/poll-card/poll-card.component';
import { AuthService } from '../../../core/auth/auth.service';
import { ButtonComponent } from '../../../core/shared/button/button.component';
import type { Poll } from '../../../core/models/poll.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, PollCardComponent, ButtonComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  polls: Poll[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private pollService: PollService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.pollService.getAllPolls().subscribe({
      next: (response) => {
        this.polls = response.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar enquetes';
        this.loading = false;
      },
    });
  }

  removePoll(id: number): void {
    this.polls = this.polls.filter((poll) => poll.id !== id);
  }
}
