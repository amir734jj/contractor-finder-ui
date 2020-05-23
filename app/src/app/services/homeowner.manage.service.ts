   import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HomeownerExtendedProfile} from '../models/management/HomeownerExtendedProfile';
import route from '../utilities/route.utility';

@Injectable()
export class HomeownerManageService {

  constructor(private http: HttpClient) {
  }

  get() {
    return this.http.get<HomeownerExtendedProfile>(route('manage', 'homeowner')).toPromise();
  }

  update(profile: HomeownerExtendedProfile) {
    return this.http.post(route('manage', 'homeowner'), profile).toPromise();
  }
}
