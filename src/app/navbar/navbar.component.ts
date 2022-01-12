import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  admin: boolean = false;

  constructor(private route: ActivatedRoute) {}

  closingLoginFunc = (event: MouseEvent): void => {
    // If user either clicks X button OR clicks outside the modal window, then close modal
    if (event != null && event.target != null) {
      const element = event.target as Element;
      console.log(event.target);
      if (
        (element.matches('.close') ||
          element.matches('.submitLogin') ||
          !element.closest('.loginContent')) &&
        !element.matches('.navBut')
      ) {
        (document.getElementById('loginModal') as HTMLElement).style.display =
          'none';
        document.removeEventListener('click', this.closingLoginFunc);
      }
    }
  };
  //put this on the click of the login button
  loginModalClick() {
    (document.getElementById('loginModal') as HTMLElement).style.display =
      'block';
    document.addEventListener('click', this.closingLoginFunc, false);
  }

  closingConnectedFunc = (event: MouseEvent): void => {
    // If user either clicks X button OR clicks outside the modal window, then close modal
    if (event != null && event.target != null) {
      const element = event.target as Element;
      console.log(event.target);
      if (
        (element.matches('.close') ||
          element.matches('.disconnect') ||
          !element.closest('.accountContent')) &&
        !element.matches('.navBut')
      ) {
        (document.getElementById('accountModal') as HTMLElement).style.display =
          'none';
        document.removeEventListener('click', this.closingConnectedFunc);
      }
    }
  };

  //put this on the click of the account button
  accountModalClick() {
    (document.getElementById('accountModal') as HTMLElement).style.display =
      'block';
    document.addEventListener('click', this.closingLoginFunc, false);
  }

  ngOnInit(): void {}
}
