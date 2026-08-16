import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = input('Title');

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
