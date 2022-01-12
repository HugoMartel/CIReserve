import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    admin:boolean;

    constructor(private authService:RequestService) {
        this.admin = false;//TODO Check with RequestService
    }


    ngOnInit(): void {

        if (this.authService.isLoggedIn()) {
            this.admin = localStorage.getItem("admin") == "true";
        }
    }

}
