import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormErrorTable} from '../../../../utilities/form.utility';
import {HomeownerManageService} from '../../../../services/homeowner.manage.service';
import {HomeownerExtendedProfile} from '../../../../models/management/HomeownerExtendedProfile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homeowner-index',
  templateUrl: './homeowner-index.component.html',
  styleUrls: ['./homeowner-index.component.sass']
})
export class HomeownerIndexComponent implements OnInit {

  form: FormGroup;
  errorTable: FormErrorTable = [];
  private profile: HomeownerExtendedProfile = { address: '', projects: [] };

  constructor(private router: Router, private homeownerManageService: HomeownerManageService) {
    this.bind();
  }

  async ngOnInit() {
    this.profile = await this.homeownerManageService.get();
    this.bind();
  }

  bind() {
    this.form = new FormGroup({
      address: new FormControl(this.profile.address, Validators.required),
    });
  }

  async handleSetAddress(event: Event) {
    event.preventDefault();

    await this.homeownerManageService.update(this.form.value);
  }

  async goToProjects() {
    await this.router.navigate(['./']);
  }
}
