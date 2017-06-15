import { Component, OnInit } from '@angular/core';
import { PaletteStateService } from '../../services';
@Component({
  selector: 'brush-size',
  templateUrl: './brush-size.component.html',
  styleUrls: ['./brush-size.component.less']
})
export class BrushSizeComponent implements OnInit {

  constructor(
    public palette: PaletteStateService
  ) { }

  ngOnInit() {
  }

  handleBrushSizeChange(evt){
    evt.target.value;
    var state = Object.assign({}, this.palette.state$.value);
    state.penWidth = parseInt(evt.target.value);
    this.palette.state$.next(state);
  }
}
