import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Palette }  from '../../dtos';
@Injectable()
export class PaletteStateService {
  
  defaultColor: string = "#000000";
  defaultOpacity: number = 1.0;

  state$: BehaviorSubject<Palette>;

  constructor() { 
    this.state$ = new BehaviorSubject<Palette>({
      penWidth: 10,
      color: this.defaultColor,
      opacity: this.defaultOpacity,
      previousColors: <string[]>[]
    });
  }

}
