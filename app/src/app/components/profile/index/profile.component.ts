import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxFileDropEntry} from 'ngx-file-drop';
import {resolveFile} from '../../../utilities/filedrop.utility';
import {Profile} from '../../../models/entities/Profile';
import {ProfileService} from '../../../services/profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ImageService} from '../../../services/image.service';
import {FormErrorTable} from '../../../utilities/form.utility';
import {NGXLogger} from 'ngx-logger';
import {Role, RoleToString} from '../../../models/RoleEnum';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  errorTable: FormErrorTable = [];
  roles = Role;

  public profile: Profile;
  public file: NgxFileDropEntry = null;
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

  handleSaveProfile(event: Event) {
    event.preventDefault();

    this.profileService.save(_.assign({}, this.profile, this.form.value))
      .subscribe(_ => {
        this.handleGetProfile();
      });
  }

  public async dropped(files: NgxFileDropEntry[]) {
    if (this.profile.photo) {
      await this.deleteImage();
    }
    this.profile.photo = await this.imageService.upload(await resolveFile(_.head(files)), 'profile-image');
  }

  public fileOver(event) {
    this.logger.debug(event);
  }

  public fileLeave(event) {
    this.logger.debug(event);
  }

  async deleteImage() {
    await this.imageService.delete(this.profile.photo);
    this.profile.photo = undefined;
  }
}
