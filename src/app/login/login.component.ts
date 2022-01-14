import { Component, OnInit } from '@angular/core';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { RequestService } from 'src/app/services/request.service';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: RequestService) {}

  ngOnInit(): void {}

  submitLogin() {
    /* Check email */
    const beginEmail = document.getElementById(
      'login-emailbegin'
    ) as HTMLInputElement;
    const endEmail = document.getElementById(
      'login-emailend'
    ) as HTMLSelectElement;

    const email = beginEmail.value + endEmail.value;

    /* Check password */
    const password = (
      document.getElementById('login-password') as HTMLInputElement
    ).value;

    this.authService.login(email, password).subscribe((response) => {
      if (response !== undefined) {
        // console.log(response);//! DEBUG
        // console.log(localStorage);//! DEBUG

        if (response.errors !== undefined) {
          //TODO
        } else if (response.fail !== undefined) {
          /* 5s fail notification */
          Notify.failure(response.fail, {
            timeout: 5000,
            position: 'center-top',
            clickToClose: true,
          });
        } else {
          /* 5s success notification */
          Notify.success(response.success, {
            timeout: 5000,
            position: 'center-top',
            clickToClose: true,
          });
          // Check Admin
          if (response.admin == true) {
            this.authService.admin = true;
          }

          // Update connected
          this.authService.name = response.name;
          this.authService.connected = true;

          // Auth
          this.authService.setSession(response);
          //closing the modal & refrelshing the page
          (
            document.getElementById('loginContent') as HTMLElement
          ).classList.remove('animateIn');
          (
            document.getElementById('loginContent') as HTMLElement
          ).classList.add('animateOut');
          //adding the listener for the animation end
          document.addEventListener('animationend', this.loginModalRemove);
          // Remove the close event listener TODO
        }
      } else {
        console.log('no response...');
      }
    });
  }

  loginModalRemove() {
    (document.getElementById('loginContent') as HTMLElement).classList.remove('animateOut');
    (document.getElementById('loginModal') as HTMLElement).style.display = 'none';
    window.location.reload();
  }
}
