import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleSigninService } from 'src/app/services/google-signin.service';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss'],
})
export class LoginGoogleComponent implements OnInit {
  constructor(
    private signInService: GoogleSigninService,
    private ref: ChangeDetectorRef,
    private http: HttpClient
  ) {}
  user: gapi.auth2.GoogleUser;
  ngOnInit(): void {
    this.subscribeService();
  }
  subscribeService() {
    this.signInService.observable().subscribe((user) => {
      this.user = user;
      this.ref.detectChanges();
      if (user) {
        console.log(this.user.getBasicProfile());
        this.sendToken();
      } else console.log('signOut');
    });
  }
  signIn() {
    this.signInService.signIn();
  }
  signOut() {
    this.signInService.signOut();
  }
  sendToken() {
    this.signInService.getToken(this.user).subscribe((res) => {
      console.log(res);
    });
  }
}
