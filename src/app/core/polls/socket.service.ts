import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
  }

  onVoteUpdated(callback: (data: any) => void) {
    this.socket.on('voteUpdated', callback);
  }

  offVoteUpdated(callback: (data: any) => void) {
    this.socket.off('voteUpdated', callback);
  }

  joinPollRoom(pollId: number) {
    this.socket.emit('joinPollRoom', pollId.toString());
  }

  leavePollRoom(pollId: number) {
    this.socket.emit('leavePollRoom', pollId.toString());
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
