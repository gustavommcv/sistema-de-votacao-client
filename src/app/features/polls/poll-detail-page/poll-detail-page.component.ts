import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../core/shared/button/button.component';
import { PollService, PollWithOptions } from '../../../core/polls/poll.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-poll-detail-page',
  standalone: true,
  imports: [CommonModule, DatePipe, ButtonComponent, FormsModule, RouterLink],
  templateUrl: './poll-detail-page.component.html',
  styleUrls: ['./poll-detail-page.component.scss'],
})
export class PollDetailPageComponent implements OnInit {
  poll!: PollWithOptions;
  loading = true;
  error: string | null = null;
  selectedOption: number | null = null;
  isPollActive = false;
  isDeleting = false;
  hasVoted = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private pollService: PollService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    const pollId = this.route.snapshot.paramMap.get('id');
    if (pollId) {
      this.loadPollDetails(+pollId);
    }
  }

  loadPollDetails(pollId: number): void {
    this.pollService.getPollById(pollId).subscribe({
      next: (response) => {
        console.log(response.data);
        this.poll = response.data;
        this.checkPollStatus();

        this.hasVoted =
          this.poll.user_vote !== null && this.poll.user_vote !== undefined;

        if (this.hasVoted) {
          this.selectedOption = this.poll.user_vote;
        } else {
          this.selectedOption = null;
        }

        console.log('Dados da enquete:', {
          poll: this.poll,
          hasVoted: this.hasVoted,
          user_vote: this.poll.user_vote,
          selectedOption: this.selectedOption,
        });

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

  getSelectedOptionText(): string {
    if (!this.selectedOption) return '';
    const option = this.poll.options.find(
      (opt) => opt.id === this.selectedOption,
    );
    return option ? option.text : '';
  }

  submitVote(): void {
    if (!this.selectedOption || !this.isPollActive || this.hasVoted) return;

    if (!this.authService.isLoggedIn()) {
      this.error = 'Você precisa estar logado para votar';
      this.router.navigate(['/login']);
      return;
    }

    this.pollService.vote(this.poll.id, this.selectedOption).subscribe({
      next: () => {
        this.hasVoted = true;
        this.loadPollDetails(this.poll.id);
      },
      error: (err) => {
        console.error('Erro ao votar:', err);
        if (err.status === 401) {
          this.error = 'Sua sessão expirou. Faça login novamente.';
          this.authService.logout().subscribe(() => {
            this.router.navigate(['/login']);
          });
        } else {
          this.error = 'Erro ao votar. Tente novamente.';
        }
      },
    });
  }

  deletePoll(): void {
    if (
      !confirm(
        'Tem certeza que deseja deletar esta enquete? Esta ação não pode ser desfeita.',
      )
    ) {
      return;
    }

    this.isDeleting = true;
    this.pollService.deletePoll(this.poll.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao deletar enquete:', err);
        this.isDeleting = false;
        this.error = 'Erro ao deletar enquete';
      },
    });
  }
}
