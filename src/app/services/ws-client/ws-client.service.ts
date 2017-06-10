import { Injectable, OnDestroy } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


@Injectable()
export class WsClientService implements OnDestroy {

  public socket;
  public connecting = false;
  
  constructor(private global: GlobalService) { 
    this.socket = this.global.io.connect('/');
  }

  getSocket() : Observable<any>{
    return Observable.create((obs: Observer<any>) => {
      if(this.socket.connected){
        obs.next(this.socket);
        obs.complete()
      }
      else{
        this.socket.on('connect', () => {
          obs.next(this.socket);
          obs.complete()
        })
      }
    })
  }

  disconnect(){
    if(this.socket){
      this.socket.disconnect();
    }
  }

  ngOnDestroy(){
    this.disconnect();
    this.socket = null;
  }
}
