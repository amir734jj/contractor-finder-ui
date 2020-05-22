import { Component, OnInit } from '@angular/core';
import {CachedAuthenticationService} from '../../../services/cached.authentication.service';
import {Profile} from '../../../models/entities/Profile';
import {Role} from '../../../models/enums/RoleEnum';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.sass']
})
export class ManagementComponent implements OnInit {

  public profile: Profile;
  public roles = Role;

  constructor(private cachedAuthenticationService: CachedAuthenticationService) { }

  ngOnInit() {
    const { profile } = this.cachedAuthenticationService.resolveAuthInfo();
    this.profile = profile;
  }

}
