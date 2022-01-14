import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnInit {

  constructor(private bookService: BookService) { }

  bookRoomSubmit() {

    const begin:Date = new Date((document.getElementById("dateB") as HTMLInputElement).value);
    const end:Date = new Date((document.getElementById("dateE") as HTMLInputElement).value);
    const reason:string = (document.getElementById("reason") as HTMLInputElement).value;
    const room:string = (document.getElementById("room") as HTMLInputElement).value;
    const name:string = localStorage.getItem("name") as string;

    // console.log(begin, end, reason, room, name);//! DEBUG

    this.bookService.bookRoom(begin, end, reason, room, name).subscribe((response) => {
      if (response !== undefined) {
        // console.log(response);//! DEBUG

        if (response.errors != undefined) {
          console.error(response.errors);
          // TODO
        } else if (response.fail !== undefined) {
          /* 5s fail notification */
          Notify.failure(response.fail, {
            timeout: 5000,
            position: 'center-top',
            clickToClose: true
          });

        } else {
          location.reload();
          /* 5s success notification */
          Notify.success(response.success, {
            timeout: 5000,
            position: 'center-top',
            clickToClose: true
          });

        }

      } else {
        console.error("Query didn't send a response...");
      }
    });
  }

  ngOnInit(): void {
    (document.getElementById("dateB") as HTMLInputElement).min = new Date().toISOString();
  }

}
