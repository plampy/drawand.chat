import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services';
import { Subscription } from 'rxjs/Rx';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  @ViewChild('chatBody') chatBody;
  public chatMessage: string;
  subs: Subscription[];
  showUserOptions: boolean = false;

  constructor(
    public chatService: ChatService
  ) { 
    this.subs = [];
  }

  ngOnInit() {
      
  }

  ngAfterContentInit(){
    setTimeout(() => {
      var el = this.chatBody.nativeElement;
      el.scrollTop = el.scrollHeight;
    }, 200)
  }

  ngAfterViewChecked(){
    var el = this.chatBody.nativeElement;
    if(el.scrollTop + el.offsetHeight >= el.scrollHeight - 100){
      el.scrollTop += el.scrollHeight;
    }
  }



  sendChatMessage(){
    if(this.chatMessage.trim()){
      this.chatService.sendChatMessage({
        message: this.chatMessage,
        date: new Date().toLocaleTimeString('en-us', {  
            weekday: "short", year: "numeric", month: "short",  
            day: "numeric", hour: "2-digit", minute: "2-digit"  
        })
      })
      this.chatMessage = "";
    }
  }
  toggleUserOptions() {
    this.showUserOptions = !this.showUserOptions;
  }
}
