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

  constructor(private http: HttpClient) {}

  /**
   * Function used to send a POST login request to the server
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string):Observable<any> {
    console.log(email, password);//! DEBUG
    return this.http.post<any>(
      '/login',
      {
        'email': email,
        'password': password
      },
      {
        'headers': jsonHeaders
      }
    );
  }


  register(email: string, password: string, username: string, isAdmin: boolean, classe: number):Observable<any> {
    console.log(email, password, username, isAdmin, classe);//! DEBUG
    return this.http.post<any>(
      '/register',
      {
        'email': email,
        'password': password,
        'username': username,
        'isAdmin': isAdmin,
        'classe': classe
      },
      {
        'headers': jsonHeaders
      }
    );
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
    const expiration:string|null = localStorage.getItem("expires_at");
    if (expiration == null) {
      return moment().subtract(1, 'months');
    } else {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
  }

}
