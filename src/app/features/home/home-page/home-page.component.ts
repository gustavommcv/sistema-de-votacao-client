import { Component, OnInit } from '@angular/core';
import { PollService } from '../../../core/polls/poll.service';
import { CommonModule } from '@angular/common';
import { PollCardComponent } from '../polls/poll-card/poll-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, PollCardComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  polls: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private pollService: PollService) { }

  ngOnInit(): void {
    this.pollService.getAllPolls().subscribe({
      next: (response) => {
        this.polls = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar enquetes';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
