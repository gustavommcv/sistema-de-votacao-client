import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../core/shared/button/button.component';
import { PollService } from '../../../core/polls/poll.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-poll-create-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonComponent],
  templateUrl: './poll-create-page.component.html',
  styleUrls: ['./poll-create-page.component.scss'],
})
export class PollCreatePageComponent {
  pollForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pollService: PollService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.pollForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      options: this.fb.array(
        [this.createOption(), this.createOption(), this.createOption()],
        { validators: Validators.minLength(3) },
      ),
    });

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  createOption(): FormGroup {
    return this.fb.group({
      text: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  removeOption(index: number): void {
    if (this.options.length > 3) {
      this.options.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.pollForm.invalid || !this.authService.isLoggedIn()) return;

    this.loading = true;
    this.error = null;

    const formValue = this.pollForm.value;

    const startDate = new Date(formValue.start_date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(formValue.end_date);
    endDate.setHours(0, 0, 0, 0);

    const pollData = {
      title: formValue.title,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      options: formValue.options.map((opt: { text: string }) => opt.text),
    };

    this.pollService.createPoll(pollData).subscribe({
      next: (response) => {
        if (response && response.data && response.data.id) {
          this.router.navigate(['/polls', response.data.id]);
        } else {
          this.error = 'Resposta inválida do servidor';
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Erro ao criar enquete:', err);

        if (err.status === 401) {
          this.error = 'Sua sessão expirou. Faça login novamente.';
          this.authService.logout().subscribe(() => {
            this.router.navigate(['/login']);
          });
        } else {
          this.error = 'Erro ao criar enquete. Tente novamente.';
        }

        this.loading = false;
      },
    });
  }
}
