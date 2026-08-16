import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ButtonComponent } from '../../../core/shared/button/button.component';

import { ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { getApiErrorMessage } from '../../../core/http/api-error';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, RouterLink],
  templateUrl: './signup-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  signupForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { email, password, confirmPassword } = this.signupForm.getRawValue();

    if (password !== confirmPassword) {
      this.error = 'As senhas não coincidem';
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.signup(email, password).pipe(finalize(() => {
      this.loading = false;
    })).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (requestError: unknown) => {
        this.error = getApiErrorMessage(requestError, 'Erro ao cadastrar usuário');
      },
    });
  }
}
