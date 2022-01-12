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
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string):Observable<any> {
    return this.http.post<Login>(
      '/login',
      {
        'email': email,
        'password': password
      },
      {
        'headers': jsonHeaders
      }
    )

    //TODO add to the appropriate button
    // .subscribe((response) => {
    //   if (response !== undefined) {
    //     console.log(response);
    //     this.setSession(response);
    //   } else {
    //     console.log("no response...")
    //   }
    // });


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
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration:string = localStorage.getItem("expires_at") as string;
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
