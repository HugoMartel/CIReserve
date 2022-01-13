import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/** @constant {HttpHeaders} jsonHeaders XHR request headers for a json */
const jsonHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Response-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class BookService {
  roomInfo:Object;
  bookInfo:Object;

  constructor(private http:HttpClient) {
    this.roomInfo = {};
    this.bookInfo = {};
  }

  // Make a request to get info about the current floor
  getFloorInfo(floor:number, date:Date) {
    return this.http.post<any>(
      '/floor',
      {
        'floor': floor,
        'date': date
      },
      {
        headers: jsonHeaders
      }
    );
  }
}
