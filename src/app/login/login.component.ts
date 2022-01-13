import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: RequestService) { }

  ngOnInit(): void { }

  submitLogin() {

    /* Check email */
    const beginEmail = document.getElementById("login-emailbegin") as HTMLInputElement;
    const endEmail = document.getElementById("login-emailend") as HTMLSelectElement;

    const email = beginEmail.value + endEmail.value;

    /* Check password */
    const password = (document.getElementById("login-password") as HTMLInputElement).value;

    this.authService.login(email, password).subscribe((response) => {
      if (response !== undefined) {
        console.log(response);
        this.authService.setSession(response);
      } else {
        console.log("no response...");
      }
    });

  };
}
