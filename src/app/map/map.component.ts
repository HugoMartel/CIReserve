import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  current_button: number;
  point_array: number[];

  constructor(private bookService:BookService) {
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
      (document.getElementById("current_etage") as HTMLImageElement).src = "../../assets/img/100.jpg";
      this.dateUpdateCallback();
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
      (document.getElementById('current_etage') as HTMLImageElement).src = '../../assets/img/300.png';
      this.dateUpdateCallback();
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
      (document.getElementById("current_etage") as HTMLImageElement).src = "../../assets/img/400.jpg";
      this.dateUpdateCallback();
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
      (document.getElementById("current_etage") as HTMLImageElement).src = "../../assets/img/600.jpg";
      this.dateUpdateCallback();
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
      (document.getElementById("current_etage") as HTMLImageElement).src = "../../assets/img/800.jpg";
      this.dateUpdateCallback();
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
      (document.getElementById("current_etage") as HTMLImageElement).src = "../../assets/img/900.jpg";
      this.dateUpdateCallback();
    }
  }

  // Callback if the dates values have changed and query the database/server
  dateUpdateCallback() {

    let date = (document.getElementById('selectDate') as HTMLInputElement).value;
    let beginTime = (document.getElementById('beginTime') as HTMLInputElement).value;
    let endTime = (document.getElementById('endTime') as HTMLInputElement).value;

    if(date == "" || beginTime == "" || endTime == ""){
      return;
    }

    let dateBegin = new Date(date+ "T" + beginTime) as Date;
    let dateEnd = new Date(date+ "T" + endTime) as Date;
    // Send POST request
    //
    // +-----------+-----------------+
    // | Btn Value | Floors to query |
    // +===========+=================+
    // |         1 | 100             |
    // |         2 | 200/300         |
    // |         3 | 400/500         |
    // |         4 | 600             |
    // |         5 | 700/800         |
    // |         6 | 900             |
    // +-----------+-----------------+
    /*
      ___               ___
     (o o)             (o o)
    (  V  ) js = caca (  V  )
------m-m---------------m-m---
____*/

    this.bookService.getFloorInfo(this.current_button, dateBegin, dateEnd).subscribe((response) => {
      if (response !== undefined) {
        console.log(response);
        console.log(localStorage);

        if (response.errors !== undefined) {
          //TODO
          console.error(response.errors);

        } else if (response.fail !== undefined) {
          /* 5s fail notification */
          Notify.failure(response.fail, {
            timeout: 5000,
            position: 'center-top',
            clickToClose: true
          });

        }else if (response.rooms !== undefined) {

          // Create the svg elements and associated modals
          const svgElement = (document.getElementById("room_coords") as HTMLElement);
          svgElement.innerHTML = "";

          // For each room of the floor
          response.rooms.forEach( (room:any):void => {

            // Create polyline html element inside the svg element
            let poly = '<polyline points="';

            // Add the points of the shape
            room.imgPos.forEach((pos:any):void => {
              poly += pos + ',';
            });

            poly += '" id="room' + room.name + '"';

            // Opacity & fill color
            poly += ' style="opacity:.8;" fill="' + (room.isBookable ? (room.booked ? 'red' : 'green') : 'blue') + '"/>';

            // Append to the svg
            svgElement.innerHTML += poly;

            (document.getElementById("room"+room.name) as HTMLElement).addEventListener("click", (e:Event) => {
              (e.target as HTMLElement).style.display = 'block';
              document.addEventListener('click', this.closingModalFunc, false);
            });

          });

        } else {
          console.error("wrong response...");
        }
      }else {
        console.error("no response...");
      }
    });
  }

  //callback of the info modal to close it if click somewhere
  closingModalFunc = (event: MouseEvent): void => {
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
        document.removeEventListener('click', this.closingModalFunc);
      }
    }
  };


  closingLoginFunc = (event: MouseEvent): void => {
    // If user either clicks X button OR clicks outside the modal window, then close modal
    if (event != null && event.target != null) {
      const element = event.target as Element;

      // Check if the element is closable
      if (
        (element.matches('.close') || !element.closest('.infoContent')) &&
        !element.matches('.roomInfoBtn') &&
        !element.matches('.infoContent') &&
        !element.matches('.roomInfoBtn')/*TMP TO REMOVE */
      ) {
        // remove the modal
        (document.getElementById('infoModal') as HTMLElement).style.display =
          'none';
        // Remove the close event listener
        document.removeEventListener('click', this.closingLoginFunc);
      }
    }
  };

  //function to open the booking modal from the info one
  bookModalFromInfo() {
    (document.getElementById('bookModal') as HTMLElement).style.display =
      'block';
    document.addEventListener('click', this.closingBookFromInfoFunc, false);
  }

  //callback to close the booking modal if clicked somewhere else
  closingBookFromInfoFunc = (event: MouseEvent): void => {
    // If user either clicks X button OR clicks outside the modal window, then close modal but no click on
    if (event != null && event.target != null) {
      const element = event.target as Element;

      // Check if the element is closable
      if (
        (element.matches('.close') || !element.closest('.bookContent')) &&
        !element.matches('.openBook') &&
        !element.matches('.bookContent') &&
        !element.matches('.bookSubmit')
      ) {
        // remove the modal
        (document.getElementById('bookModal') as HTMLElement).style.display =
          'none';
        // Remove the close event listener
        document.removeEventListener('click', this.closingBookFromInfoFunc);
      }
    }
    //closing the other one;
    (document.getElementById('infoModal') as HTMLElement).style.display =
      'none';
  };

  // Request info on the floor from the server

  ngOnInit(): void {
    // Put current dates
    const nowDate:string[] = new Date().toLocaleDateString().split('/');
    const nowTime:string = new Date().toLocaleTimeString();
    const pastTime:string = (parseInt((nowTime).split(':')[0]) + 1 ).toString().concat(nowTime.slice(2));
    (document.getElementById("selectDate") as HTMLInputElement).value = nowDate[2] + "-" + nowDate[1] + "-" + nowDate[0];
    (document.getElementById("beginTime") as HTMLInputElement).value = nowTime;
    (document.getElementById("endTime") as HTMLInputElement).value = parseInt((nowTime).split(':')[0]) < 23 ? (pastTime.length == 7 ? pastTime : '0' + pastTime ) : "23:59:00";

    // Request the default floor
    this.dateUpdateCallback();

    // DEBUG to generate points array
    (document.getElementById("room_coords") as HTMLElement).addEventListener("click", (e:MouseEvent) => {
      e.preventDefault();
      this.point_array.push(e.clientX - (document.getElementById("room_coords") as HTMLElement).getBoundingClientRect().x);
      this.point_array.push(e.clientY - (document.getElementById("room_coords") as HTMLElement).getBoundingClientRect().y);
      console.log(this.point_array);
    });
  }
}

