import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuth().subscribe();
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/auth/login`,
        { email, password },
        { withCredentials: true },
      )
      .pipe(
        tap((response: any) => {
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(response.loggedIn);
        }),
      );
  }

  logout(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/auth/logout`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(false);
          this.currentUserSubject.next(null);
        }),
      );
  }
  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, { email, password });
  }

  checkAuth(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/users/isLoggedIn`, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          this.isAuthenticatedSubject.next(response.authenticated);
          this.currentUserSubject.next(response.user || null);
        }),
        catchError((error) => {
          this.isAuthenticatedSubject.next(false);
          this.currentUserSubject.next(null);
          return throwError(() => error);
        }),
      );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
