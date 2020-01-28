import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ContractorService} from '../../services/contractor.service';
import {NgxFileDropEntry} from 'ngx-file-drop';
import {ActionContext, fileDropHandlerUtility} from '../../utilities/filedrop.utility';
import {ContractorProfilePhoto} from '../../models/entities/ContractorProfilePhoto';
import {IProfile, Profile} from '../../models/entities/Profile';
import {ProfileService} from '../../services/profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  private form: FormGroup;

  constructor(private router: Router, private profileService: ProfileService) {
    this.profile = new Profile();
    this.bind();
  }

  public profile: IProfile;

  public file: NgxFileDropEntry = null;

  ngOnInit() {
    this.handleGetProfile();
  }

  bind() {
    this.form = new FormGroup({
      firstname: new FormControl(this.profile.firstname, Validators.required),
      lastname: new FormControl(this.profile.lastname, Validators.required),
      description: new FormControl(this.profile.description, Validators.required),
      email: new FormControl(this.profile.email, [
        Validators.required,
        Validators.email
      ]),
      phoneNumber: new FormControl(this.profile.phoneNumber, Validators.required)
    });
  }

  handleGetProfile() {
    this.profileService.get().subscribe(profile => {
      this.profile = profile;
      this.bind();
    });
  }

  handleSaveContractor(event: Event) {
    event.preventDefault();

    this.profileService.save(_.assign({}, this.profile, this.form.value))
      .subscribe(_ => this.handleGetProfile());
  }

  public dropped(files: NgxFileDropEntry[]) {
    // fileDropHandlerUtility(this, files, ActionContext.SAVE);
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    // this.contractor.profilePhoto = null;
  }

  deleteImage() {
    // this.contractor.profilePhoto = new ContractorProfilePhoto();
  }
}
