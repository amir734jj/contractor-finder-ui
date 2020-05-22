import {Component, OnDestroy, OnInit} from '@angular/core';
import {setTheme} from 'ngx-bootstrap/utils';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {ProfileType} from './types/profile.type';
import {CachedAuthenticationService} from './services/cached.authentication.service';
import {Subscription, timer} from 'rxjs';
import {Role, RoleToString} from './models/RoleEnum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Wizpiti';
  public navBarCollapsed = true;
  public profile: ProfileType;
  public authenticated = false;
  private authenticatedSubscription: Subscription;
  public roles = Role;
  public roleToString = RoleToString;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private cachedAuthenticationService: CachedAuthenticationService) {
    setTheme('bs3');
  }

  ngOnInit() {
    // If session key exist then continue
    if (this.authenticated) {
      this.authenticationService.isAuthenticated()
        .then(async response => {
          if (!response) {
            this.cachedAuthenticationService.clearAuthInfo();
            await this.router.navigate(['./login']);
          }
        });
    }

    this.authenticatedSubscription = timer(0, 100)
      .subscribe(() => {
        const { authenticated, profile } = this.cachedAuthenticationService.resolveAuthInfo();
        this.authenticated = authenticated;
        this.profile = profile;
      });
  }

  ngOnDestroy() {
    this.authenticatedSubscription.unsubscribe();
  }
}
