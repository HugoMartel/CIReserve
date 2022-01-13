import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private user : UserService) { }

  ngOnInit(): void {
  }

  submitRegister() {

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const classVal = (document.getElementById("promo") as HTMLSelectElement).value;
    const classe = this.user.getClass(classVal) as Number;

    const admin = (classe == 0) as Boolean;


  }

}
