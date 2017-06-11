import {
  Component,
  OnInit,
  ElementRef,
  Input,
  AfterViewInit,
  ViewChild,
  Renderer2,
  OnDestroy
} from '@angular/core';
import { WsClientService, PaletteStateService, ElementProjectionService } from '../../services';
import { Subscription } from 'rxjs/Subscription';
import { Palette } from '../../dtos';

@Component({
  selector: 'app-draw-canvas',
  templateUrl: './draw-canvas.component.html',
  styleUrls: ['./draw-canvas.component.less']
})
export class DrawCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('width') width: number;
  @Input('height') height: number;
  @ViewChild('canvas') canvas: any;

  subscriptions: Subscription[];

  context: CanvasRenderingContext2D;
  penWidth: number;
  currentColor: string;
  socket: any;

  inactiveTimeout: number = 5000;
  inactiveTimeoutRef: any;

  canvasMouseDown: Function;
  canvasMouseUp: Function;
  canvasMouseMove: Function;
  canvasMouseOut: Function;

  paletteStateRef: Palette;

  // Canvas input state tracking
  isDrawing = false;
  firstClick = false;
  prevX = 0;
  prevY = 0;
  currentX = 0;
  currentY = 0;

  constructor(
    private el: ElementRef,
    private wsClient: WsClientService,
    private renderer: Renderer2,
    private palette: PaletteStateService,
    private eps: ElementProjectionService) { 
      this.subscriptions = [];
    }

  ngOnInit() {
    this.subscriptions.push(this.palette.state$.subscribe(state => {
      this.paletteStateRef = state;
    }))
    this.wsClient.getSocket().subscribe(socket => {
      this.socket = socket;
      socket.on('drawAction', (data) => { this.handleDrawActionMessage(data) });
      socket.on('drawActions', (data: any[]) => { data.forEach(d => this.handleDrawActionMessage(d)) });
      socket.emit('getDrawHistory',{});
      this.setEventListeners();
    });
  }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.eps.projectedElement = this.canvas.nativeElement;
  }

  ngOnDestroy() {
    this.canvasMouseUp();
    this.canvasMouseDown();
    this.canvasMouseMove();
    this.canvasMouseOut();
    this.subscriptions.forEach(sub => {
      if(!sub.closed){
        sub.unsubscribe();
      }
    })
  }
  fillCircle(data: any, emit?: boolean) {
    var x = data.x;
    var y = data.y;
    var radius = data.radius;
    var centerX = x - radius;
    var centerY = y - radius;
    this.context.globalAlpha = data.opacity || this.palette.defaultOpacity;
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = data.color || this.palette.defaultColor;
    this.context.fill();
    this.context.globalAlpha = this.palette.defaultOpacity;
  }
  fillRect(data: any, emit?: boolean) {
    this.context.globalAlpha = data.opacity || this.palette.defaultOpacity;
    this.context.fillStyle = data.color || this.palette.defaultColor;
    this.context.fillRect(data.x, data.y, data.width, data.height);
    this.context.globalAlpha = this.palette.defaultOpacity;
  }

  strokePath(data: any, emit?: boolean) {
    // var startCoords = this.eps.projectXY({x: data.startX, y: data.startY});
    // var endCoords = this.eps.projectXY({x: data.endX, y: data.endY});
    // data.startX = startCoords.x;
    // data.startY = startCoords.y;
    // data.endX = endCoords.x;
    // data.endY = endCoords.y;
    this.context.globalAlpha = data.opacity || this.palette.defaultOpacity;
    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.context.strokeStyle = data.color || this.palette.defaultColor;
    this.context.lineWidth = data.penWidth;
    this.context.beginPath();

    this.context.moveTo(data.startX, data.startY);
    this.context.lineTo(data.endX, data.endY);
    this.context.stroke();
    this.context.globalAlpha = this.palette.defaultOpacity;
    if(emit){
      if(this.inactiveTimeoutRef){
        clearTimeout(this.inactiveTimeoutRef);
      }
      this.inactiveTimeoutRef = setTimeout(() => {
        this.socket.emit('setUserInactive',{})
      }, this.inactiveTimeout);

      this.socket.emit('drawAction', {
        ...data,
        type: 'strokePath'
      })
    }
  }

  clearAll() {
    return this.clearRect({
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height
    });
  }

  clearRect(data) {
    this.context.clearRect(data.x, data.y, data.width, data.height);
  }

  handleDrawActionMessage(data) {
    switch(data.type){
      case 'strokePath':
        this.strokePath(data);
    }
  }

  private setEventListeners() {
    var nativeElement = this.canvas.nativeElement;
    this.canvasMouseDown = this.renderer.listen(nativeElement, 'mousedown', (evt) => {
      var state = this.paletteStateRef;
      this.isDrawing = true;
      this.firstClick = true;
      // this.prevX = this.currentX - (state.penWidth /2);
      // this.prevY = this.currentY - (state.penWidth /2);
      // this.currentX = evt.clientX - (state.penWidth /2);
      // this.currentY = evt.clientY - (state.penWidth /2);
      this.prevX = this.currentX;
      this.prevY = this.currentY;
      this.currentX = evt.clientX;
      this.currentY = evt.clientY;

      var startCoords = this.eps.projectXY({x: this.prevX, y: this.prevY});
      var endCoords = this.eps.projectXY({x: this.currentX, y: this.currentY});

      if (this.firstClick) {
        this.strokePath({
            opacity: state.opacity,
            startX: endCoords.x ,
            startY: endCoords.y ,
            endX: endCoords.x,
            endY: endCoords.y,
            color: state.color,
            penWidth: state.penWidth,
          }, true);
        this.firstClick = false;
      }
    })
    this.canvasMouseMove = this.renderer.listen(nativeElement, 'mousemove', (evt) => {
      var state = this.paletteStateRef;
      if (this.isDrawing) {
        this.prevX = this.currentX;
        this.prevY = this.currentY;
        // this.currentX = evt.clientX - (state.penWidth /2);
        // this.currentY = evt.clientY - (state.penWidth/2);
        this.currentX = evt.clientX;
        this.currentY = evt.clientY;

        var startCoords = this.eps.projectXY({x: this.prevX, y: this.prevY});
        var endCoords = this.eps.projectXY({x: this.currentX, y: this.currentY});
        this.strokePath({
            opacity: state.opacity,
            startX: startCoords.x,
            startY: startCoords.y,
            endX: endCoords.x,
            endY: endCoords.y,
            color: state.color,
            penWidth: state.penWidth,
          }, true);
      }
    })
    this.canvasMouseUp = this.renderer.listen(nativeElement, 'mouseup', (evt) => {
      var state = this.paletteStateRef;
      this.isDrawing = false;
      this.firstClick = false;
    })
    this.canvasMouseOut = this.renderer.listen(nativeElement, 'mouseout', (evt) => {
      var state = this.paletteStateRef;
      this.isDrawing = false;
      this.firstClick = false;
    })
  }
}
