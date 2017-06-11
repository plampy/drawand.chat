import { Injectable, ElementRef } from '@angular/core';
import { GlobalService } from '../global/global.service';

@Injectable()
export class ElementProjectionService {

  projectedElement: any;

  constructor(
    private global: GlobalService
    ) { 
  }


  projectX(inputX){
    return this.projectXY({x : inputX, y: 0}).x;
  }

  projectY(inputY){
    return this.projectXY({x : 0, y: inputY}).y;
  }

  projectXY(inputCoords){
    if(!this.projectedElement){
      return {
        xAdd: 0,
        yAdd: 0,
        x: inputCoords.x,
        y: inputCoords.y
      }
    }
    var offsetX = 0;
    var offsetY = 0;
    var offSetParent = this.projectedElement && this.projectedElement.nativeElement ? this.projectedElement.nativeElement : this.projectedElement;
    while(offSetParent){
      offsetX += offSetParent.offsetLeft;
      offsetY += offSetParent.offsetTop;
      offSetParent = offSetParent.parentElement;
    }
    var projectedXAdd = this.global.window.scrollX - offsetX;
    var projectedYAdd = this.global.window.scrollY - offsetY;
    return {
      xAdd: projectedXAdd,
      yAdd: projectedYAdd,
      x: inputCoords.x + projectedXAdd,
      y: inputCoords.y + projectedYAdd
    };
  }

}
