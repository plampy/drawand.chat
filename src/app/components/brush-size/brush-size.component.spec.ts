import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushSizeComponent } from './brush-size.component';

describe('BrushSizeComponent', () => {
  let component: BrushSizeComponent;
  let fixture: ComponentFixture<BrushSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
