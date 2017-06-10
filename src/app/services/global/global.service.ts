import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  constructor() { }

  get window(){
    return window;
  }

  get io(): any {
    return window['io'] ;
  }
  
}
