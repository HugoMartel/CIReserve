import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    constructor(public authService: RequestService) {}

    //put this on the click of the login button
    loginModalClick() {
        document.removeEventListener('animationend', this.loginModalRemove);
        (document.getElementById('loginModal') as HTMLElement).style.display = 'block';
        (document.getElementById('loginContent') as HTMLElement).classList.add("animateIn");
        document.addEventListener('click', this.closingLoginFunc, false);
    }

    loginModalRemove() {
        (document.getElementById('loginContent') as HTMLElement).classList.remove('animateOut');
        (document.getElementById('loginModal') as HTMLElement).style.display = 'none';
    }

    closingLoginFunc = (event: MouseEvent): void => {
        // If user either clicks X button OR clicks outside the modal window, then close modal
        if (event != null && event.target != null) {
            const element = event.target as Element;

            // Check if the element is closable
            if (
                (element.matches('.close') ||
                element.matches('.submitLogin') ||
                !element.closest('.loginContent')) &&
                (!element.matches('.navBut') && !element.matches(".submitLogin"))
            ) {
                // remove the modal
                (document.getElementById('loginContent') as HTMLElement).classList.remove("animateIn");
                (document.getElementById('loginContent') as HTMLElement).classList.add("animateOut");
                //adding the listener for the animation end
                document.addEventListener('animationend', this.loginModalRemove);
                // Remove the close event listener
                document.removeEventListener('click', this.closingLoginFunc);
            }
        }
    }


    closingConnectedFunc = (event: MouseEvent): void => {
        // If user either clicks X button OR clicks outside the modal window, then close modal
        if (event != null && event.target != null) {
            const element = event.target as Element;

            if (
                (element.matches('.close') ||
                element.matches('.disconnect') ||
                !element.closest('.accountContent')) &&
                !element.matches('.navBut')
            ) {
                // remove the modal
                (document.getElementById('accountContent') as HTMLElement).classList.remove("animateIn");
                (document.getElementById('accountContent') as HTMLElement).classList.add("animateOut");
                //adding the listener for the animation end
                document.addEventListener('animationend', this.accountModalRemove);
                document.removeEventListener('click', this.closingConnectedFunc);
            }
        }
    }

    accountModalRemove() {
        (document.getElementById('accountContent') as HTMLElement).classList.remove('animateOut');
        (document.getElementById('accountModal') as HTMLElement).style.display = 'none';
    }

    //put this on the click of the account button
    accountModalClick() {
        document.removeEventListener('animationend', this.accountModalRemove);
        (document.getElementById('accountContent') as HTMLElement).classList.add("animateIn");
        (document.getElementById('accountModal') as HTMLElement).style.display = 'block';
        document.addEventListener('click', this.closingConnectedFunc, false);
    }

    // ON INIT
    ngOnInit(): void {

        /* Check Token to connect or not */
        this.authService.connected = this.authService.isLoggedIn();
        if (this.authService.connected) {
            this.authService.name = localStorage.getItem("name") as string;
            this.authService.admin = localStorage.getItem("admin") == "true";
        }
    }

}
