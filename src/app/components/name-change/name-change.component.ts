import { Component, OnInit } from '@angular/core';
import { UserService }  from '../../services';
@Component({
  selector: 'name-change',
  templateUrl: './name-change.component.html',
  styleUrls: ['./name-change.component.less']
})
export class NameChangeComponent implements OnInit {

  nameChange: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  changeUsername(){
    this.userService.changeUsername(this.nameChange);
  }
}
