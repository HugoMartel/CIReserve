import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private bookService:BookService, public authService:RequestService) { }

  ngOnInit(): void {
    // Init the table
    if (this.authService.isLoggedIn()) {
      this.updateTable();
    } else {
      (document.getElementById("userReservTable") as HTMLTableElement).innerHTML += '<tr><td></td><td></td><td>Connectez vous pour afficher vos réservations !</td></tr>';
    }
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
    document.removeEventListener('animationend', this.bookModalRemove);
    (document.getElementById('bookModal') as HTMLElement).style.display ='block';
    (document.getElementById('bookContent') as HTMLElement).classList.add("animateIn");
    document.addEventListener('click', this.closingBookFunc);
  }

  bookModalRemove() {
    (document.getElementById('bookContent') as HTMLElement).classList.remove('animateOut');
    (document.getElementById('bookModal') as HTMLElement).style.display = 'none';
  }

  closingBookFunc = (event: MouseEvent): void => {
    // If user either clicks X button OR clicks outside the modal window, then close modal
    if (event != null && event.target != null) {
      const element = event.target as Element;

      // Check if the element is closable
      if (
        (element.matches('.close') ||
        !element.closest('.bookContent')) &&
        (!element.matches('.showBook') &&
        !element.matches('.bookContent'))
      ) {
        console.log("passed if shit");
        // remove the modal
        (document.getElementById('bookContent') as HTMLElement).classList.remove("animateIn");
        (document.getElementById('bookContent') as HTMLElement).classList.add("animateOut");
        //adding the listener for the animation end
        document.addEventListener('animationend', this.bookModalRemove);        // Remove the close event listener
        document.removeEventListener('click', this.closingBookFunc);
      }
    }
  }
}
