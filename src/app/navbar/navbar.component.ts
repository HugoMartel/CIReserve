import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public authService: RequestService) {}

  showOptionModal() {
    document.removeEventListener('animationend', this.optionModalRemove);
    (document.getElementById('optionModal') as HTMLElement).style.display = 'block';
    (document.getElementById('optionContent') as HTMLElement).classList.add("animateIn");
    document.addEventListener('click', this.closingOptionFunc, false);
  }
  optionModalRemove() {
    (document.getElementById('optionContent') as HTMLElement).classList.remove('animateOut');
    (document.getElementById('optionModal') as HTMLElement).style.display = 'none';
  }

  closingOptionFunc = (event: MouseEvent): void => {
    // If user either clicks X button OR clicks outside the modal window, then close modal
    if (event != null && event.target != null) {
      const element = event.target as Element;

      // Check if the element is closable
      if (
        (element.matches('.close') || !element.closest('.optionContent')) &&
        !element.matches('.showOption') &&
        !element.matches('.optionContent')
      ) {
        // remove the modal
        (document.getElementById('optionContent') as HTMLElement).classList.remove("animateIn");
        (document.getElementById('optionContent') as HTMLElement).classList.add("animateOut");
        //adding the listener for the animation end
        document.addEventListener('animationend', this.optionModalRemove);
        // Remove the close event listener
        document.removeEventListener('click', this.closingOptionFunc);
      }
    }
  };

  ngOnInit(): void {
    /* Update admin variable */
    if (this.authService.isLoggedIn()) {
      this.authService.admin = localStorage.getItem('admin') == 'true';
    }
  }
}
