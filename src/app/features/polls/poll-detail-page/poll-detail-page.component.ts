import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../core/shared/button/button.component';
import { PollService, PollWithOptions } from '../../../core/polls/poll.service';

@Component({
  selector: 'app-poll-detail-page',
  standalone: true,
  imports: [CommonModule, DatePipe, ButtonComponent, FormsModule],
  templateUrl: './poll-detail-page.component.html',
  styleUrls: ['./poll-detail-page.component.scss'],
})
export class PollDetailPageComponent implements OnInit {
  poll!: PollWithOptions;
  loading = true;
  error: string | null = null;
  selectedOption: number | null = null;
  isPollActive = false;

  constructor(
    private route: ActivatedRoute,
    private pollService: PollService,
  ) { }

  ngOnInit(): void {
    const pollId = this.route.snapshot.paramMap.get('id');
    if (pollId) {
      this.loadPollDetails(+pollId);
    }
  }

  loadPollDetails(pollId: number): void {
    this.pollService.getPollById(pollId).subscribe({
      next: (response) => {
        this.poll = response.data;
        this.checkPollStatus();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar enquete';
        this.loading = false;
        console.error(err);
      },
    });
  }

  checkPollStatus(): void {
    const now = new Date();
    const startDate = new Date(this.poll.start_date);
    const endDate = new Date(this.poll.end_date);
    this.isPollActive = now >= startDate && now <= endDate;
  }

  submitVote(): void {
    if (!this.selectedOption || !this.isPollActive) return;

    this.pollService.vote(this.poll.id, this.selectedOption).subscribe({
      next: () => {
        this.loadPollDetails(this.poll.id);
      },
      error: (err) => {
        console.error('Erro ao votar:', err);
      },
    });
  }
}
