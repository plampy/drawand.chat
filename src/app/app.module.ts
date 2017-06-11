import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as Services from './services';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatRoomComponent } from './views/chat-room/chat-room.component';
import { DrawCanvasComponent } from './components/draw-canvas/draw-canvas.component';
import { ChatComponent } from './components/chat/chat.component';
import { PeopleChipsComponent } from './components/people-chips/people-chips.component';
import { NameChangeComponent } from './components/name-change/name-change.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { BrushSizeComponent } from './components/brush-size/brush-size.component';
import { EraserComponent } from './components/eraser/eraser.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    DrawCanvasComponent,
    ChatComponent,
    PeopleChipsComponent,
    NameChangeComponent,
    ColorPickerComponent,
    BrushSizeComponent,
    EraserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ColorPickerModule
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
