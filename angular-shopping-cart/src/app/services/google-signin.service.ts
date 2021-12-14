import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSigninService {
  private auth2: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  private serverURL = 'http://localhost:3000/user/idToken';

  constructor(private http: HttpClient) {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '664914268503-ggq07gi47md2uje3pp824f7vubrfcf5q.apps.googleusercontent.com',
      });
    });
  }
  public signIn() {
    this.auth2
      .signIn({})
      .then((user) => {
        this.subject.next(user);
      })
      .catch(() => {
        this.subject.next(null);
      });
  }
  public signOut() {
    this.auth2.signOut().then(() => {
      this.subject.next(null);
    });
  }
  public getToken(user) {
    let idToken = user.getAuthResponse().id_token;
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + idToken
    );
    return this.http.post<any>(this.serverURL, null, { headers: headers });
  }
  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }
}
