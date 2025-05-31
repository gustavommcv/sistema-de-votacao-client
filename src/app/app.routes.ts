import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import { PollDetailPageComponent } from './features/polls/poll-detail-page/poll-detail-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Sistema de Votação',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login - Sistema de Votação',
  },
  {
    path: 'polls/:id',
    component: PollDetailPageComponent,
    title: 'Sistema de Votação',
  },
];
