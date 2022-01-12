import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  admin:boolean = false;

  constructor(private route: ActivatedRoute) {}

  closingFunc = (event: MouseEvent): void => {
    // If user either clicks X button OR clicks outside the modal window, then close modal
    if (event != null && event.target != null) {
      const element = event.target as Element;
      console.log(event.target);
      if((element.matches(".close") || element.matches(".submitLogin") || !element.closest(".loginContent")) && !element.matches(".navBut")) {
        (document.getElementById("loginModal") as HTMLElement).style.display = "none";
        document.removeEventListener("click", this.closingFunc);
        console.log("removed");
      }
    }
  }

  loginModalClick() {
    (document.getElementById("loginModal") as HTMLElement).style.display = "block";
    document.addEventListener(
      "click",
      this.closingFunc,
      false);
  }

  ngOnInit(): void {
  }

}
