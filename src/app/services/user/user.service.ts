import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WsClientService, GlobalService } from '../../services';
import { User } from '../../dtos';

@Injectable()
export class UserService {

  socket: any;
  connectedUsers$: BehaviorSubject<User[]>;
  connectedUsersMap: Map<string, User>;

  constructor(
    private wsClient: WsClientService,
    private global: GlobalService
  ) {
    this.connectedUsers$ = new BehaviorSubject<User[]>([]);
    this.connectedUsersMap = new Map<string, User>();

    this.wsClient.getSocket().subscribe(socket => {
      this.socket = socket;
      socket.on('userConnected', (data: User) => { this.handleUserConnected(data) })
      socket.on('userDisconnected', (data: User) => { this.handleUserDisconnected(data) })
      socket.on('allConnectedUsers', (data: User[]) => { this.handleAllConnectedUsers(data) })
      socket.on('usersBatchUpdate', (data: User[]) => { this.handleUsersBatchUpdate(data) })
      socket.on('userUpdate', (data: User) => { this.handleUserUpdate(data) })
      socket.emit('getAllConnectedUsers', {});
      var existingUsername = this.global.window.localStorage.getItem('username');
      if(existingUsername){
        this.changeUsername(existingUsername);
      }
    })
  }

  getUserById(id: string){
    return Object.assign({}, this.connectedUsersMap.get(id));
  }

  changeUsername(username: string){
    this.socket.emit('changeUsername', { username: username })
    this.global.window.localStorage.setItem('username', username);
  }
  handleUserConnected(data: User) {
    var users = [...this.connectedUsers$.value, data];
    this.connectedUsers$.next(users);
    this.connectedUsersMap[data.id] = data;
  }
  handleUserDisconnected(data: any) {
    var users = [...this.connectedUsers$.value];
    users = users.filter(x => x.id !== data.id);
    delete this.connectedUsersMap[data.id];
    this.connectedUsers$.next(users);
  }

  handleAllConnectedUsers(data: Array<User>) {
    this.connectedUsers$.next(data);
    this.connectedUsersMap = new Map<string, User>();
    data.forEach(user => {
      this.connectedUsersMap[user.id] = user;
    })
  }

  handleUsersBatchUpdate(data: User[]) {
    //TODO: if we dont need this function delete
    //if we do end up needing this function, optimize it.
    if (!this.connectedUsersMap) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      this.handleUserUpdate(data[i]);
    }
  }
  
  handleUserUpdate(data: User) {
    var users = [...this.connectedUsers$.value];
    var index = -1;
    var user = users.find((user, idx) => {
      if(user.id == data.id){
        index = idx;
        return true;
      }
      return false;
    });
    if(user){
      users[index] = data;
      this.connectedUsers$.next(users);
      this.connectedUsersMap[data.id] = data;
    }
  }
}
