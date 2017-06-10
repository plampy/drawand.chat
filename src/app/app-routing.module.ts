import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './views/chat-room/chat-room.component';

const routes: Routes = [
  {
    path: '',
    component: ChatRoomComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
