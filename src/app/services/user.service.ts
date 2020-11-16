import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from './auth.service';
import { take, filter, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { UserFactoryService } from 'src/app/factories/user-factory.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userB$: BehaviorSubject<User> = new BehaviorSubject(null);
  userChanged$: Observable<User> = this.userB$.asObservable();
  loadedB$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private userFactory: UserFactoryService,
    private authService: AuthService
  ) {
    this.getLoggedInUserData().subscribe((user: User) => {
      this.userB$.next(user);
    });
  }

  getUserB$() {
    return this.userB$.pipe(filter(user => user !== null));
  }

  getLoggedInUserData(): Observable<User> {
    return this.authService.userChanged$.pipe(
      filter(u => u !== null),
      distinctUntilChanged(),
      switchMap((user: User) => {
        return of(user);
      })
    );
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.userB$.next(null);
    });
  }
}
