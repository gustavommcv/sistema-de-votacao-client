import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import type { VoteUpdatedEvent } from '../models/poll.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly socket: Socket;

  constructor() {
    this.socket = io(environment.socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
  }

  onVoteUpdated(callback: (data: VoteUpdatedEvent) => void): void {
    this.socket.on('voteUpdated', callback);
  }

  offVoteUpdated(callback: (data: VoteUpdatedEvent) => void): void {
    this.socket.off('voteUpdated', callback);
  }

  joinPollRoom(pollId: number): void {
    this.socket.emit('joinPollRoom', pollId.toString());
  }

  leavePollRoom(pollId: number): void {
    this.socket.emit('leavePollRoom', pollId.toString());
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
