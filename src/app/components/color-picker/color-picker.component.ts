import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PaletteStateService } from '../../services';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less']
})
export class ColorPickerComponent implements OnInit, AfterViewInit {
  @ViewChild('colorPickerContainer') colorPickerContainer: ElementRef;
  color: any;

  constructor(
    private palette: PaletteStateService
  ) { }

  ngOnInit() {
  }
  //Style overrides due to use of thirdparty lib
  ngAfterViewInit(){
    var el = this.colorPickerContainer.nativeElement;
    var colorPicker = el.querySelector('.color-picker');
    colorPicker.style.borderRadius = "4px";
    colorPicker.style.backgroundColor= "#282c34";
    colorPicker.style.border= "none";
  }
  handleColorChange(color){
    var currentState = Object.assign({}, this.palette.state$.value);
    currentState.color = color;
    this.palette.state$.next(currentState);
  }
}
