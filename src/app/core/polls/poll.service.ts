import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { ApiMessage, ApiResponse } from '../models/api.model';
import type { CreatePollRequest, Poll, PollWithOptions, VoteUpdatedEvent } from '../models/poll.model';
import { SocketService } from './socket.service';

export type { Poll, PollWithOptions } from '../models/poll.model';

@Injectable({ providedIn: 'root' })
export class PollService {
  private readonly apiUrl = `${environment.apiUrl}/polls`;

  constructor(
    private readonly http: HttpClient,
    private readonly socketService: SocketService,
  ) {}

  listenForVoteUpdates(pollId: number, callback: (event: VoteUpdatedEvent) => void): void {
    this.socketService.joinPollRoom(pollId);
    this.socketService.onVoteUpdated(callback);
  }

  stopListeningForVoteUpdates(pollId: number, callback: (event: VoteUpdatedEvent) => void): void {
    this.socketService.leavePollRoom(pollId);
    this.socketService.offVoteUpdated(callback);
  }

  getAllPolls(): Observable<ApiResponse<Poll[]>> {
    return this.http.get<ApiResponse<Poll[]>>(this.apiUrl);
  }

  getPollById(id: number): Observable<ApiResponse<PollWithOptions>> {
    return this.http.get<ApiResponse<PollWithOptions>>(`${this.apiUrl}/${id}`);
  }

  vote(pollId: number, optionId: number): Observable<ApiMessage> {
    return this.http.post<ApiMessage>(`${this.apiUrl}/${pollId}/vote`, { option_id: optionId });
  }

  createPoll(poll: CreatePollRequest): Observable<ApiResponse<Poll>> {
    return this.http.post<ApiResponse<Poll>>(this.apiUrl, poll);
  }

  deletePoll(id: number): Observable<ApiMessage> {
    return this.http.delete<ApiMessage>(`${this.apiUrl}/${id}`);
  }

  updatePollTitle(pollId: number, title: string): Observable<ApiMessage> {
    return this.http.patch<ApiMessage>(`${this.apiUrl}/${pollId}/title`, { title });
  }
}
