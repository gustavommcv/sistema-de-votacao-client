import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from '../../../core/polls/poll.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poll-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './poll-edit-page.component.html',
  styleUrls: ['./poll-edit-page.component.scss'],
})
export class PollEditPageComponent implements OnInit {
  editForm: FormGroup;
  loading = true;
  saving = false;
  error: string | null = null;
  pollId!: number;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private pollService: PollService,
    private fb: FormBuilder,
  ) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pollId = +id;
      this.loadPollDetails();
    }
  }

  loadPollDetails(): void {
    this.pollService.getPollById(this.pollId).subscribe({
      next: (response) => {
        this.editForm.patchValue({
          title: response.data.title,
        });
        this.loading = false;
      },
      error: (_err) => {
        this.error = 'Erro ao carregar enquete';
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) return;

    this.saving = true;
    this.error = null;

    this.pollService
      .updatePollTitle(this.pollId, this.editForm.value.title)
      .subscribe({
        next: () => {
          this.router.navigate(['/polls', this.pollId]);
        },
        error: (err) => {
          this.saving = false;
          this.error = err.error?.error || 'Erro ao atualizar enquete';
        },
      });
  }
}
