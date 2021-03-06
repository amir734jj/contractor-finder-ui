import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import User from '../../models/entities/User';
import {RoleToString} from '../../models/RoleEnum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public roleToString = RoleToString;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe(response => {
      this.users = response;
    });
  }
}
