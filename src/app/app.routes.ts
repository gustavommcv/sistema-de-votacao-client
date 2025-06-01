import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import { PollDetailPageComponent } from './features/polls/poll-detail-page/poll-detail-page.component';
import { PollCreatePageComponent } from './features/polls/poll-create-page/poll-create-page.component';
import { PollEditPageComponent } from './features/polls/poll-edit-page/poll-edit-page.component';
import { SignupPageComponent } from './features/auth/signup-page/signup-page.component';

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
    path: 'signup',
    component: SignupPageComponent,
    title: 'Registrar - Sistema de Votação',
  },
  {
    path: 'polls/create',
    component: PollCreatePageComponent,
    title: 'Sistema de Votação',
  },
  {
    path: 'polls/:id',
    component: PollDetailPageComponent,
    title: 'Sistema de Votação',
  },
  {
    path: 'polls/:id/edit',
    component: PollEditPageComponent,
    title: 'Sistema de Votação',
  },
];
