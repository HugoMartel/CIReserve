import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    connected: boolean;
    name?: string;


    constructor(private authService: RequestService) {

        console.log("Constructing Account Component");

        this.connected = false;

    }

    //put this on the click of the login button
    loginModalClick() {
        console.log("clicked login");
        (document.getElementById('loginModal') as HTMLElement).style.display = 'block';
        document.addEventListener('click', this.closingLoginFunc, false);
    }


    closingLoginFunc = (event: MouseEvent): void => {
        // If user either clicks X button OR clicks outside the modal window, then close modal
        if (event != null && event.target != null) {
            const element = event.target as Element;
            console.log(event.target);
            if (
                (element.matches('.close') ||
                    element.matches('.submitLogin') ||
                    !element.closest('.loginContent')) &&
                (!element.matches('.navBut') && !element.matches(".submitLogin"))
            ) {
                (document.getElementById('loginModal') as HTMLElement).style.display =
                    'none';
                document.removeEventListener('click', this.closingLoginFunc);
            }
        }
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
    }

    //put this on the click of the account button
    accountModalClick() {
        (document.getElementById('accountModal') as HTMLElement).style.display = 'block';
        document.addEventListener('click', this.closingLoginFunc, false);
    }

    // ON INIT
    ngOnInit(): void {
        console.log("OnInit Account Component");

        /* Check Token to connect or not */
        this.connected = this.authService.isLoggedIn() ? true : false;
        if (this.connected) {
            this.name = localStorage.getItem("id_token") as string;
        }
    }

}
