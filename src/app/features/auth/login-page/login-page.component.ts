import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { getApiErrorMessage } from '../../../core/http/api-error';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.getRawValue();

    this.authService
      .login(email ?? '', password ?? '')
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: unknown) => {
          this.errorMessage = getApiErrorMessage(
            error,
            'Não foi possível entrar. Tente novamente.',
          );
        },
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
