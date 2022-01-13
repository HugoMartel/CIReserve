import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

    constructor(public authService:RequestService) {
    }


    ngOnInit(): void {

        /* Update admin variable */
        if (this.authService.isLoggedIn()) {
            this.authService.admin = localStorage.getItem("admin") == "true";
        }
    }

}
