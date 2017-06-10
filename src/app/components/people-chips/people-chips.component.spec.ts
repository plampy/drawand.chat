import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleChipsComponent } from './people-chips.component';

describe('PeopleChipsComponent', () => {
  let component: PeopleChipsComponent;
  let fixture: ComponentFixture<PeopleChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
