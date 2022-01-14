import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Init the table
    this.updateTable();
  }

  updateTable() {

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
