import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';

interface Login {
  email: string;
  password: string;
}

/** @constant {HttpHeaders} jsonHeaders XHR request headers for a json */
const jsonHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Response-Type': 'application/json'});

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  constructor(private http: HttpClient) {
    console.log("Request Service constructed");
  }

  login(email: string, password: string):Observable<any> {
    console.log(email, password);
    return this.http.post<any>(
      '/login',
      {
        'email': email,
        'password': password
      },
      {
        'headers': jsonHeaders
      }
    )


    // .do((res:any) => this.setSession).shareReplay();
  }

  public setSession(authResult:any) {
    const expiresAt:moment.Moment = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    console.log("TEST LOGGED")
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration:string|null = localStorage.getItem("expires_at");
    if (expiration == null) {
      return moment().subtract(1, 'months');
    } else {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
  }

}
