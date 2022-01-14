import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: RequestService) { }

  ngOnInit(): void {
  }

  submitRegister() {

    const name:string = (document.getElementById("name") as HTMLInputElement).value;
    const email:string = (document.getElementById("email") as HTMLInputElement).value;
    const password:string = (document.getElementById("password") as HTMLInputElement).value;
    const classe:number = parseInt((document.getElementById("promo") as HTMLSelectElement).value);
    const admin:boolean = (classe === 0) as boolean;

    this.authService.register(email, password, name, admin, classe).subscribe((response) => {
      if (response !== undefined) {
        // console.log(response);//! DEBUG

        if (response.errors !== undefined) {
          //TODO

        } else if (response.fail !== undefined) {
          /* 5s fail notif */
          Notify.failure(response.fail, {
            timeout: 5000,
            position: 'center-top',
            clickToClose: true
          });
        } else {
          /* 5s success notif */
          Notify.success(response.success, {
            timeout: 5000,
            position: 'center-top',
            clickToClose: true
          });
        }

      } else {
        console.error("No response from the server...");
      }
    });

  }

}
