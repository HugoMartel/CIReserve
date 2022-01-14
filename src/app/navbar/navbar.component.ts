import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

    constructor(public authService:RequestService, private mapComponent:MapComponent) {}

    showOptionModal() {
        (document.getElementById('optionModal') as HTMLElement).style.display =
          'block';
        document.addEventListener('click', this.closingOptionFunc, false);
      }
    
    closingOptionFunc = (event: MouseEvent): void => {
      // If user either clicks X button OR clicks outside the modal window, then close modal
      if (event != null && event.target != null) {
        const element = event.target as Element;

        // Check if the element is closable
        if (
          (element.matches('.close') ||
            !element.closest('.optionContent')) &&
          !element.matches('.showOption') &&
          !element.matches('.optionContent')
        ) {
          // remove the modal
          (document.getElementById('optionModal') as HTMLElement).style.display =
            'none';
          // Remove the close event listener
          document.removeEventListener('click', this.closingOptionFunc);
        }
      }
    }

    saveOption() {
      localStorage.setItem("covidMode", (document.getElementById("covidodo") as HTMLInputElement).checked ? "true" : "false");

      if (document.getElementById('current_etage') !== null) {
        this.mapComponent.current_button = parseInt(document.getElementsByClassName("current")[0].id[3]);
        this.mapComponent.dateUpdateCallback();
      }

      // remove the modal
      (document.getElementById('optionModal') as HTMLElement).style.display = 'none'; 
    }

    ngOnInit(): void {

        /* Update admin variable */
        if (this.authService.isLoggedIn()) {
            this.authService.admin = localStorage.getItem("admin") == "true";
        }
    }

}
