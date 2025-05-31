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
  dateError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pollService: PollService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.pollForm = this.fb.group(
      {
        title: ['', [Validators.required, Validators.minLength(5)]],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        options: this.fb.array(
          [this.createOption(), this.createOption(), this.createOption()],
          { validators: Validators.minLength(3) },
        ),
      },
      { validator: this.dateValidator },
    );

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  private dateValidator(group: FormGroup): { [key: string]: any } | null {
    const startDate = group.get('start_date')?.value;
    const endDate = group.get('end_date')?.value;

    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return start >= end ? { invalidDates: true } : null;
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
    this.error = null;
    this.dateError = null;

    if (this.pollForm.invalid || !this.authService.isLoggedIn()) {
      if (this.pollForm.hasError('invalidDates')) {
        this.dateError =
          'A data de término deve ser posterior à data de início';
      }
      return;
    }

    const startDate = new Date(this.pollForm.value.start_date);
    const endDate = new Date(this.pollForm.value.end_date);

    if (startDate >= endDate) {
      this.dateError = 'A data de término deve ser posterior à data de início';
      return;
    }

    this.loading = true;

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const pollData = {
      title: this.pollForm.value.title,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      options: this.pollForm.value.options.map(
        (opt: { text: string }) => opt.text,
      ),
    };

    this.pollService.createPoll(pollData).subscribe({
      next: (response) => {
        if (response?.data?.id) {
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
