import { Component, OnInit } from '@angular/core';
import { UserService, PaletteStateService, ElementProjectionService } from '../../services';

@Component({
  selector: 'people-chips',
  templateUrl: './people-chips.component.html',
  styleUrls: ['./people-chips.component.less']
})
export class PeopleChipsComponent implements OnInit {

  constructor(
    public userService: UserService,
    public eps: ElementProjectionService
    ) { }

  ngOnInit() {
  }
}
