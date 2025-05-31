import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Poll {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  user_id: number;
  user_email?: string;
  links: {
    self: { method: string; href: string };
    vote: { method: string; href: string };
    results: { method: string; href: string };
  };
}

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private apiUrl = `${environment.apiUrl}/polls`;

  constructor(private http: HttpClient) {}

  getAllPolls(): Observable<{data: Poll[]}> {
    return this.http.get<{data: Poll[]}>(this.apiUrl);
  }
}
