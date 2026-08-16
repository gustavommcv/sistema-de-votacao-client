import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../core/shared/button/button.component';
import { PollService, PollWithOptions } from '../../../core/polls/poll.service';
import { AuthService } from '../../../core/auth/auth.service';
import { getPollStatus, type PollStatus, type VoteUpdatedEvent } from '../../../core/models/poll.model';
import { getApiErrorMessage } from '../../../core/http/api-error';

@Component({
  selector: 'app-poll-detail-page',
  standalone: true,
  imports: [CommonModule, DatePipe, ButtonComponent, FormsModule],
  templateUrl: './poll-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./poll-detail-page.component.scss'],
})
export class PollDetailPageComponent implements OnInit, OnDestroy {
  poll!: PollWithOptions;
  loading = true;
  error: string | null = null;
  selectedOption: number | null = null;
  isPollActive = false;
  isDeleting = false;
  hasVoted = false;
  pollStatus: PollStatus = 'not-started';

  private pollId!: number;
  private readonly voteUpdateCallback = (data: VoteUpdatedEvent): void => {
    if (data.pollId === this.pollId && this.poll) {
      this.poll.options = data.options;

      if (this.poll.user_vote !== null) {
        const votedOption = this.poll.options.find(
          (opt) => opt.id === this.poll.user_vote,
        );
        if (votedOption) {
          this.hasVoted = true;
          this.selectedOption = this.poll.user_vote;
        }
      }
    }
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private pollService: PollService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    const pollIdParam = this.route.snapshot.paramMap.get('id');
    if (pollIdParam) {
      this.pollId = +pollIdParam;
      this.loadPollDetails(this.pollId);
      this.setupSocketListeners(this.pollId);
    }
  }

  ngOnDestroy(): void {
    if (this.pollId) {
      this.pollService.stopListeningForVoteUpdates(
        this.pollId,
        this.voteUpdateCallback,
      );
    }
  }

  setupSocketListeners(pollId: number): void {
    this.pollService.listenForVoteUpdates(pollId, this.voteUpdateCallback);
  }

  loadPollDetails(pollId: number): void {
    this.pollService.getPollById(pollId).subscribe({
      next: (response) => {
        this.poll = response.data;
        this.checkPollStatus();

        this.hasVoted =
          this.poll.user_vote !== null && this.poll.user_vote !== undefined;

        if (this.hasVoted) {
          this.selectedOption = this.poll.user_vote;
        } else {
          this.selectedOption = null;
        }

        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar enquete';
        this.loading = false;
      },
    });
  }

  checkPollStatus(): void {
    this.pollStatus = getPollStatus(this.poll);
    this.isPollActive = this.pollStatus === 'in-progress';
  }

  getStatusText(): string {
    switch (this.pollStatus) {
      case 'not-started':
        return 'Não iniciada';
      case 'in-progress':
        return 'Em andamento';
      case 'finished':
        return 'Encerrada';
      default:
        return '';
    }
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
      error: (requestError: unknown) => {
        this.error = getApiErrorMessage(requestError, 'Erro ao votar. Tente novamente.');
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
      error: (requestError: unknown) => {
        this.isDeleting = false;
        this.error = getApiErrorMessage(requestError, 'Erro ao deletar enquete');
      },
    });
  }
}
