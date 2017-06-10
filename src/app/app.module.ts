import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as Services from './services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatRoomComponent } from './views/chat-room/chat-room.component';
import { DrawCanvasComponent } from './components/draw-canvas/draw-canvas.component';
import { ChatComponent } from './components/chat/chat.component';
import { PeopleChipsComponent } from './components/people-chips/people-chips.component';
import { NameChangeComponent } from './components/name-change/name-change.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    DrawCanvasComponent,
    ChatComponent,
    PeopleChipsComponent,
    NameChangeComponent,
    ColorPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    //Services.WsClientService,
    Services.GlobalService,
    Services.PaletteStateService,
    Services.UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
