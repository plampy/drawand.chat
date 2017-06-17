import { Injectable } from '@angular/core';
import { WsClientService } from '../ws-client/ws-client.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ChatService {

  socket: any;
  chatMessages$: BehaviorSubject<any[]>;

  constructor(
    private wsClient: WsClientService
  ) {
    this.chatMessages$ = new BehaviorSubject<any[]>([]);
    this.wsClient.getSocket().subscribe(socket => {
      this.socket = socket;
      socket.on('allChatHistory', (data) => { this.handleAllChatHistory(data) });
      socket.on('chatMessage', (data) => { this.handleChatMessage(data) });
      socket.emit('getChatHistory', {})
    })
  }

  handleAllChatHistory(data) {
    this.chatMessages$.next(data);
  }

  handleChatMessage(data) {
    let currentChat = [...this.chatMessages$.value];
    currentChat.push(data);
    this.chatMessages$.next(currentChat);
  }

  sendChatMessage(data: any){
    //sendChatMessage
    this.socket.emit('sendChatMessage', data);
  }

}
