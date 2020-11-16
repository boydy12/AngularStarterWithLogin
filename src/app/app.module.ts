import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';

/* Add Component imports */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/nav/side-bar/side-bar.component';
import { CenterMainComponent } from './components/nav/center-main/center-main.component';
import { CardComponent } from './components/utility/card/card.component';
import { TitleComponent } from './components/utility/title/title.component';
import { ContainerComponent } from './components/nav/container/container.component';
import { ContentMainComponent } from './components/nav/content-main/content-main.component';
import { NavButtonComponent } from './components/nav/nav-button/nav-button.component';
import { LoginComponent } from './components/nav/login/login.component';
import { SideBarItemComponent } from './components/nav/side-bar-item/side-bar-item.component';
import { IconButtonComponent } from './components/utility/icon-button/icon-button.component';
import { ModalComponent } from './components/utility/modal/modal.component';
import { FormInputComponent } from './components/utility/form-input/form-input.component';

/* Other Imports */
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    CenterMainComponent,
    CardComponent,
    TitleComponent,
    ContainerComponent,
    ContentMainComponent,
    NavButtonComponent,
    LoginComponent,
    SideBarItemComponent,
    IconButtonComponent,
    ModalComponent,
    FormInputComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    SocialLoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '<ID-HERE>.apps.googleusercontent.com'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
