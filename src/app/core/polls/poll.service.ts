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

export interface PollWithOptions extends Poll {
  options: {
    id: number;
    text: string;
    votes_count: number;
  }[];
  user_vote: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private apiUrl = `${environment.apiUrl}/polls`;

  constructor(private http: HttpClient) { }

  getAllPolls(): Observable<{ data: Poll[] }> {
    return this.http.get<{ data: Poll[] }>(this.apiUrl);
  }

  getPollById(id: number): Observable<{ data: PollWithOptions }> {
    return this.http.get<{ data: PollWithOptions }>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  vote(pollId: number, optionId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${pollId}/vote`,
      { option_id: optionId },
      { withCredentials: true },
    );
  }

  createPoll(pollData: {
    title: string;
    start_date: string;
    end_date: string;
    options: string[];
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, pollData, {
      withCredentials: true,
    });
  }

  deletePoll(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  updatePollTitle(pollId: number, title: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${pollId}/title`,
      { title },
      { withCredentials: true },
    );
  }
}
