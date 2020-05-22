import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProfileService} from '../services/profile.service';
import {ImageService} from '../services/image.service';
import {AccountModule} from './account.module';
import {MatSelectModule} from '@angular/material/select';
import {FileUploadModule} from '@iplab/ngx-file-upload';
import {ManagementComponent} from '../components/management/index/management.component';
import {ContractorProfileComponent} from '../components/management/contractor/index/contractor-profile.component';
import {ShowcaseProjectAddComponent} from '../components/management/contractor/showcase/showcase-project-add.component';
import {HomeownerProjectComponent} from '../components/management/homeowner/homeownerproject/homeowner-project.component';
import {HomeownerIndexComponent} from '../components/management/homeowner/index/homeowner-index.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    AccountModule,
    MatSelectModule,
    FileUploadModule
  ],
  providers: [ProfileService, ImageService],
  declarations: [ManagementComponent,
    ContractorProfileComponent,
    ShowcaseProjectAddComponent,
    HomeownerIndexComponent,
    HomeownerProjectComponent],
  exports: [ManagementComponent]
})
export class ManagementModule {

}
