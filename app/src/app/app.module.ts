import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {appRoutes} from './RouterConfig';
import {RouteReuseStrategy, RouterModule, UrlSerializer} from '@angular/router';
import {BoardModule} from './modules/board.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ContractorModule} from './modules/contractor.module';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {AccountModule} from './modules/account.module';
import {CommonComponentModule} from './modules/common.module';
import {JwtInterceptor} from './intercepters/jwt.intercepter';
import {AboutComponent} from './components/about/about.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {FormsModule} from '@angular/forms';
import {ProfileModule} from './modules/profile.module';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {UserModule} from './modules/user.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomCanActivate} from './utilities/injectables/custom.can.activate';
import {CustomReuseStrategy} from './utilities/injectables/custom.reuse.strategy.utility';
import {RouteStoreUtility} from './utilities/injectables/store/route.store.utility';
import {ErrorHandlerStoreUtility} from './utilities/injectables/store/error.handler.store.utility';
import {LowerCaseUrlSerializer} from './utilities/injectables/custom.url.serializer.utility';
import {CachedAuthenticationService} from './services/cached.authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    ButtonsModule.forRoot(),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      disableConsoleLogging: false
    }),
    HttpClientModule,
    CommonComponentModule,
    AccountModule,
    BoardModule,
    ProfileModule,
    UserModule,
    ContractorModule,
    NgxFileDropModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [CustomCanActivate, CachedAuthenticationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    {provide: UrlSerializer, useClass: LowerCaseUrlSerializer},
    ErrorHandlerStoreUtility,
    RouteStoreUtility
  ],
  exports: [ ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
