import { Component, OnInit } from '@angular/core';
import { AuthService, AuthState } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  public loaded: boolean = false;
  public loggedIn: boolean = false;
  public message: string = "";

  constructor(
    private authService: AuthService
  ) { 
    this.authService.userChanged$.subscribe((authUser: User) => {
      console.log(authUser)
      this.loaded = this.authService.authState != AuthState.Initialising;
      if(authUser) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    })
    
  }

  ngOnInit(): void {
  }

}
