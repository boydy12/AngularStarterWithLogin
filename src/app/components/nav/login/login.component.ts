import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hover: boolean = false;
  public pressed: boolean = false;

  @Input() message: string;

  constructor(
    private AuthService: AuthService
  ) {
   
  }

  signIn(): void {
    this.AuthService.login();
  }

  ngOnInit(): void {
  }

}
