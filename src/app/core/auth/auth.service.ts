import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { ApiMessage } from '../models/api.model';
import type { LoginResponse, SessionResponse, SignupResponse, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly isAuthenticatedSubject = new BehaviorSubject(false);
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);

  readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  async initialize(): Promise<void> {
    await firstValueFrom(this.checkAuth());
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(tap(({ loggedIn }) => this.setSession(loggedIn)));
  }

  logout(): Observable<ApiMessage> {
    return this.http.get<ApiMessage>(`${this.apiUrl}/auth/logout`).pipe(
      tap(() => this.clearSession()),
      catchError((error: unknown) => {
        this.clearSession();
        throw error;
      }),
    );
  }

  signup(email: string, password: string): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/auth/signup`, {
      email,
      password,
    });
  }

  checkAuth(): Observable<SessionResponse> {
    return this.http.get<SessionResponse>(`${this.apiUrl}/users/isLoggedIn`).pipe(
      tap((response) => {
        if (response.authenticated && response.user) this.setSession(response.user);
        else this.clearSession();
      }),
      catchError(() => {
        this.clearSession();
        return of({ authenticated: false });
      }),
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setSession(user: User): void {
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(user);
  }

  private clearSession(): void {
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }
}
