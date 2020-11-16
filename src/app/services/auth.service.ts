import { Injectable } from '@angular/core';

import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { AuthFactoryService } from '../factories/auth-factory.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userB$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  userChanged$: Observable<User> = this.userB$.asObservable();
  userDb: User;
  authState: AuthState = AuthState.Initialising;
  public idToken: string = null;
  

  constructor(
    private socialAuthService: SocialAuthService,
    private authFactory: AuthFactoryService
  ) {
    this.socialAuthService.authState.subscribe((socialUser) => {
      console.log(socialUser)
      if(socialUser) {
        this.idToken = socialUser.idToken;
        this.authState = AuthState.LoggedIn;
        if(!this.userDb) {
          this.userDb = {
            Id: 0,
            SocialId: socialUser.id,
            Email: socialUser.email,
            DisplayName: socialUser.name,
            PhotoUrl: socialUser.photoUrl
          }
        }

        this.userB$.next(this.userDb);
      }
      else {
        this.authState = AuthState.LoggedOut;
        this.userB$.next(null);
      }
    });
  }

  login() {
    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;
    if(isSafari) {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    else {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID, { ux_mode: "redirect" });
    }
  }

  signOut() {
    console.log("sign out")
    this.authState = AuthState.LoggedOut;
    this.userB$.next(null);
    return this.socialAuthService.signOut();
  }

}

export enum AuthState {
  Initialising = 0,
  LoggedIn = 1,
  LoggedOut = 2,
}