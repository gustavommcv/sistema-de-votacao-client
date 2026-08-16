import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home-page/home-page.component').then(
        (module) => module.HomePageComponent,
      ),
    title: 'Sistema de Votação',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login-page/login-page.component').then(
        (module) => module.LoginPageComponent,
      ),
    title: 'Login - Sistema de Votação',
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/signup-page/signup-page.component').then(
        (module) => module.SignupPageComponent,
      ),
    title: 'Registrar - Sistema de Votação',
  },
  {
    path: 'polls/create',
    loadComponent: () =>
      import('./features/polls/poll-create-page/poll-create-page.component').then(
        (module) => module.PollCreatePageComponent,
      ),
    canActivate: [authGuard],
    title: 'Criar enquete - Sistema de Votação',
  },
  {
    path: 'polls/:id',
    loadComponent: () =>
      import('./features/polls/poll-detail-page/poll-detail-page.component').then(
        (module) => module.PollDetailPageComponent,
      ),
    title: 'Enquete - Sistema de Votação',
  },
  {
    path: 'polls/:id/edit',
    loadComponent: () =>
      import('./features/polls/poll-edit-page/poll-edit-page.component').then(
        (module) => module.PollEditPageComponent,
      ),
    canActivate: [authGuard],
    title: 'Editar enquete - Sistema de Votação',
  },
  { path: '**', redirectTo: '' },
];
