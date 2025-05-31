import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login - Sistema de Votação',
  },
];
