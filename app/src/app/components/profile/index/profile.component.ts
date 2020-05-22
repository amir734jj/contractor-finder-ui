import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Profile} from '../../../models/entities/Profile';
import {ProfileService} from '../../../services/profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ImageService} from '../../../services/image.service';
import {FormErrorTable} from '../../../utilities/form.utility';
import {NGXLogger} from 'ngx-logger';
import {Role, RoleToString} from '../../../models/RoleEnum';
import * as _ from 'lodash';
import {FileUploadValidators} from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  errorTable: FormErrorTable = [];
  roles = Role;

  public animation = false;
  public multiple = false;

  public profile: Profile;
  public roleToString = RoleToString;

  constructor(private router: Router, private profileService: ProfileService,
              public imageService: ImageService, private logger: NGXLogger) {
    this.profile = new Profile();
    this.bind();
  }

  ngOnInit() {
    this.handleGetProfile();
  }

  bind() {
    if (this.form) {
      this.form.get('photo').setValue([]);
    }

    this.form = new FormGroup({
      photo: new FormControl(null, FileUploadValidators.filesLimit(1)),
      name: new FormControl(this.profile.name, Validators.required),
      description: new FormControl(this.profile.description, Validators.required),
      email: new FormControl(this.profile.email, [
        Validators.required,
        Validators.email
      ]),
      phoneNumber: new FormControl(this.profile.phoneNumber, Validators.required)
    });
  }

  handleGetProfile() {
    this.profileService.get().then(profile => {
      this.profile = profile;
      this.bind();
    });
  }

  async handleSaveProfile(event: Event) {
    event.preventDefault();
    if (this.form.value.photo) {
      this.profile.photo = await this.imageService.upload(_.first(this.form.value.photo));
    }

    this.profileService.save(_.assign({}, this.profile, _.pick(this.form.value, 'name', 'description', 'email', 'phoneNumber')))
      .then(() => {
        this.handleGetProfile();
      });
  }

  get photoUrl(): string {
    return this.profile.photo ? this.imageService.downloadUrl(this.profile.photo) : '';
  }

  async deletePhoto() {
    this.profile.photo = null;

    this.profileService.save(_.assign({}, this.profile, _.pick(this.form.value, 'name', 'description', 'email', 'phoneNumber')))
      .then(() => {
        this.handleGetProfile();
      });
  }
}
