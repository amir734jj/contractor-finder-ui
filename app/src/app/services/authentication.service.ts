import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/authentication.service/login/LoginRequest';
import {RegisterRequest} from '../models/authentication.service/register/RegisterRequest';
import route from '../utilities/route.utility';
import * as jwtDecode from 'jwt-decode';
import {ProfileType} from '../types/profile.type';
import * as _ from 'lodash';
import {CachedAuthenticationService} from './cached.authentication.service';
import {RouteStoreUtility} from '../utilities/injectables/store/route.store.utility';
import {Role} from '../models/enums/RoleEnum';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
              private routeStoreUtility: RouteStoreUtility,
              private cachedAuthenticationService: CachedAuthenticationService) {
  }

  async isAuthenticated(): Promise<boolean> {
    const response = await this.http.get<{}>(route('account')).toPromise();

    return _.size(response) !== 0;
  }

  async login(loginRequest: LoginRequest) {
    const response = await this.http.post<ProfileType>(route('account', 'login'), loginRequest).toPromise();

    if (response.token) {
      const jwtMetadata = jwtDecode<{}>(response.token);
      // store email and jwt token in local storage to keep userRef logged in between page refreshes
      this.cachedAuthenticationService.setAuthInfo({...jwtMetadata, ...response, timestamp: new Date()});
    }

    return response;
  }

  async register(role: Role, registerRequest: RegisterRequest) {
    return await this.http.post(route('account', 'register', role), registerRequest, {responseType: 'text'}).toPromise();
  }

  async logout() {
    this.cachedAuthenticationService.clearAuthInfo();

    this.routeStoreUtility.store = this.routeStoreUtility.store.clear();

    return await this.http.post(route('account', 'logout'), null, {responseType: 'text'}).toPromise();
  }
}
