import { Component, OnInit } from '@angular/core';
import { WsClientService,UserService, ElementProjectionService } from '../../services';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.less'],
  providers:[ WsClientService, UserService, ElementProjectionService]
})
export class ChatRoomComponent implements OnInit {

  constructor(private wsClient: WsClientService) { }
  
  ngOnInit() {
  }
  
}
