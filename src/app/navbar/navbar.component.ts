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

  loginModalClick() {
    (document.getElementById("loginModal") as HTMLElement).style.display = "block";
    /*document.addEventListener(
      "click",
      function(event) {
        // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
        if (event != null && event.target != null && (document.getElementById("loginModal") as HTMLElement).style.display != "none") {
          const element = event.target as Element;
          if(element.matches(".close") || !element.closest(".modal")) {
            (document.getElementById("loginModal") as HTMLElement).style.display = "none";
          }
        }
      }, false);*/
  }

  ngOnInit(): void {
  }

}
