import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    // Init the table
    this.updateTable();
  }

  // Update the user's reservation table
  updateTable() {
    this.bookService.getUserBooked(localStorage.getItem('id') as string).subscribe(response => {
      if (response !== undefined) {

        if (response.errors != undefined) {
          console.error(response.errors);
          //TODO

        } else {

          let content = '';

          response.reservations.forEach((reserv:any) => {
            content += '<tr><td>' + reserv.time;
            content += '</td><td>' + reserv.room;
            content += '</td><td>' + reserv.reason;
            content += '</td></tr>';
          });

          // Insert into the table
          (document.getElementById("userReservTable") as HTMLTableElement).innerHTML += content;

        }

      } else {
        console.error("Request didn't send anything...");
      }
    });

  }

  showBookModal() {
    (document.getElementById('bookModal') as HTMLElement).style.display =
      'block';
    document.addEventListener('click', this.closingBookFunc, false);
  }

  closingBookFunc = (event: MouseEvent): void => {
    // If user either clicks X button OR clicks outside the modal window, then close modal
    if (event != null && event.target != null) {
      const element = event.target as Element;

      // Check if the element is closable
      if (
        (element.matches('.close') ||
          !element.closest('.bookContent')) &&
        !element.matches('.showBook') &&
        !element.matches('.bookContent') &&  (!element.matches('.bookSubmit'))
      ) {
        // remove the modal
        (document.getElementById('bookModal') as HTMLElement).style.display =
          'none';
        // Remove the close event listener
        document.removeEventListener('click', this.closingBookFunc);
      }
    }
  }
}
