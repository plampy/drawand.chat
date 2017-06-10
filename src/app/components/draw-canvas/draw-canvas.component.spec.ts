import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedCanvasComponent } from './managed-canvas.component';

describe('ManagedCanvasComponent', () => {
  let component: ManagedCanvasComponent;
  let fixture: ComponentFixture<ManagedCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
