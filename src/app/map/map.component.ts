import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  current_button: number;
  point_array:number[];

  constructor(/*private route:Router*/) {
    this.current_button = 3;
    this.point_array = [];
  }

  // Btn 1 Click Event Callback
  clickBtn1() {
    if (this.current_button != 1) {
      // Change the current button class
      (
        document.getElementById(
          'btn' + this.current_button
        ) as HTMLButtonElement
      ).classList.remove('current');
      (document.getElementById('btn1') as HTMLButtonElement).classList.add(
        'current'
      );
      this.current_button = 1;

      // Change the img src
      (document.getElementById('current_etage') as HTMLImageElement).src =
        '../../assets/img/100.jpg';
    }
  }

  // Btn 2 Click Event Callback
  clickBtn2() {
    if (this.current_button != 2) {
      // Change the current button class
      (
        document.getElementById(
          'btn' + this.current_button
        ) as HTMLButtonElement
      ).classList.remove('current');
      (document.getElementById('btn2') as HTMLButtonElement).classList.add(
        'current'
      );
      this.current_button = 2;

      // Change the img src
      (document.getElementById('current_etage') as HTMLImageElement).src =
        '../../assets/img/300.png';
    }
  }

  // Btn 3 Click Event Callback
  clickBtn3() {
    if (this.current_button != 3) {
      // Change the current button class
      (
        document.getElementById(
          'btn' + this.current_button
        ) as HTMLButtonElement
      ).classList.remove('current');
      (document.getElementById('btn3') as HTMLButtonElement).classList.add(
        'current'
      );
      this.current_button = 3;

      // Change the img src
      (document.getElementById('current_etage') as HTMLImageElement).src =
        '../../assets/img/400.jpg';
    }
  }

  // Btn 4 Click Event Callback
  clickBtn4() {
    if (this.current_button != 4) {
      // Change the current button class
      (
        document.getElementById(
          'btn' + this.current_button
        ) as HTMLButtonElement
      ).classList.remove('current');
      (document.getElementById('btn4') as HTMLButtonElement).classList.add(
        'current'
      );
      this.current_button = 4;

      // Change the img src
      (document.getElementById('current_etage') as HTMLImageElement).src =
        '../../assets/img/600.jpg';
    }
  }

  // Btn 5 Click Event Callback
  clickBtn5() {
    if (this.current_button != 5) {
      // Change the current button class
      (
        document.getElementById(
          'btn' + this.current_button
        ) as HTMLButtonElement
      ).classList.remove('current');
      (document.getElementById('btn5') as HTMLButtonElement).classList.add(
        'current'
      );
      this.current_button = 5;

      // Change the img src
      (document.getElementById('current_etage') as HTMLImageElement).src =
        '../../assets/img/800.jpg';
    }
  }

  // Btn 6 Click Event Callback
  clickBtn6() {
    if (this.current_button != 6) {
      // Change the current button class
      (
        document.getElementById(
          'btn' + this.current_button
        ) as HTMLButtonElement
      ).classList.remove('current');
      (document.getElementById('btn6') as HTMLButtonElement).classList.add(
        'current'
      );
      this.current_button = 6;

      // Change the img src
      (document.getElementById('current_etage') as HTMLImageElement).src =
        '../../assets/img/900.jpg';
    }
  }

  showModal() {
    (document.getElementById('infoModal') as HTMLElement).style.display =
      'block';
    document.addEventListener('click', this.closingLoginFunc, false);
  }

  closingLoginFunc = (event: MouseEvent): void => {
    // If user either clicks X button OR clicks outside the modal window, then close modal
    if (event != null && event.target != null) {
      const element = event.target as Element;

      // Check if the element is closable
      if (
        (element.matches('.close') ||
          !element.closest('.infoContent')) &&
        !element.matches('.roomInfoBtn') &&
        !element.matches('.infoContent') &&  (!element.matches('.roomInfoBtn'))
      ) {
        // remove the modal
        (document.getElementById('infoModal') as HTMLElement).style.display =
          'none';
        // Remove the close event listener
        document.removeEventListener('click', this.closingLoginFunc);
      }
    }
  };
  // Request info on the floor from the server

  ngOnInit(): void {
    // DEBUG to generate
    (document.getElementById("room_coords") as HTMLElement).addEventListener("click", (e:MouseEvent) => {
      e.preventDefault();
      this.point_array.push(e.clientX - (document.getElementById("room_coords") as HTMLElement).getBoundingClientRect().x);
      this.point_array.push(e.clientY - (document.getElementById("room_coords") as HTMLElement).getBoundingClientRect().y);
      console.log(this.point_array);
    });
  }
}
