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
  admin:boolean;
  connected:boolean;
  name: string;

  constructor(private http: HttpClient) {
    this.admin = false;
    this.connected = false;
    this.name = "";
  }

  // Setter for connected variable
  // public setConnected(c:boolean):void {
  //   this.connected = c;
  // }

  // // Getter for connected variable
  // public getConnected():boolean {
  //   return this.connected;
  // }

  // // Setter for connected variable
  // public setAdmin(a:boolean):void {
  //   this.admin = a;
  // }

  // // Getter for connected variable
  // public getAdmin():boolean {
  //   return this.admin;
  // }

  // // Setter for connected variable
  // public setName(n:string):void {
  //   this.name = n;
  // }

  // // Getter for connected variable
  // public getName():string {
  //   return this.name;
  // }

  // Login POST XHR
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
    );

  }

  public setSession(authResult:any):void {
    const expiresAt:moment.Moment = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("name", authResult.name);
    localStorage.setItem("admin", authResult.admin == true ? "true":"false");
  }

  logout():void {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("admin");
    localStorage.removeItem("name");
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
