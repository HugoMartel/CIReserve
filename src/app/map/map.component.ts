import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  modalMap:Map<string,string>;
  current_button:number;

  constructor(private bookService:BookService) {
    this.current_button = 3;
    this.modalMap = new Map;
  }

  // Btn 1 Click Event Callback
  clickBtn1() {    
    if (this.current_button != 1) {
      // Change the current button class
      (document.getElementById("btn" + this.current_button) as HTMLButtonElement).classList.remove("current");
      (document.getElementById("btn1") as HTMLButtonElement).classList.add("current");
      this.current_button = 1;

      // Change the img src
      (document.getElementById("current_etage") as HTMLImageElement).src = "../../assets/img/100.png";
      this.dateUpdateCallback();
    }
  }

  // Btn 2 Click Event Callback
  clickBtn2() {
    if (this.current_button != 2) {
      // Change the current button class
      (document.getElementById("btn" + this.current_button) as HTMLButtonElement).classList.remove("current");
      (document.getElementById("btn2") as HTMLButtonElement).classList.add("current");
      this.current_button = 2;

      // Change the img src
      (document.getElementById("current_etage") as HTMLImageElement).src = "../../assets/img/300.jpg";
      this.dateUpdateCallback();
    }
  }

  // Btn 3 Click Event Callback
  clickBtn3() {
    if (this.current_button != 3) {
      // Change the current button class
      (document.getElementById("btn" + this.current_button) as HTMLButtonElement).classList.remove("current");
      (document.getElementById("btn3") as HTMLButtonElement).classList.add("current");
      this.current_button = 3;

      // Change the img src
      (document.getElementById("current_etage") as HTMLImageElement).src = "../../assets/img/400.png";
      this.dateUpdateCallback();
    }
  }

  // Btn 4 Click Event Callback
  clickBtn4() {
    if (this.current_button != 4) {
      // Change the current button class
      (document.getElementById("btn" + this.current_button) as HTMLButtonElement).classList.remove("current");
      (document.getElementById("btn4") as HTMLButtonElement).classList.add("current");
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
      (document.getElementById("btn" + this.current_button) as HTMLButtonElement).classList.remove("current");
      (document.getElementById("btn5") as HTMLButtonElement).classList.add("current");
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
      (document.getElementById("btn" + this.current_button) as HTMLButtonElement).classList.remove("current");
      (document.getElementById("btn6") as HTMLButtonElement).classList.add("current");
      this.current_button = 6;

      // Change the img src
      (document.getElementById("current_etage") as HTMLImageElement).src = "../../assets/img/900.jpg";
      this.dateUpdateCallback();
    }
  }

  //
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
          // Clear Map
          this.modalMap.clear();

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

            // Add the modal content to the modal map paired with its name
            this.modalMap.set(room.name, room.modalContent);

          });

        } else {
          console.error("wrong response...");
        }
      }else {
        console.error("no response...");
      }
    });
  }

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

  ngOnInit(): void {

    // Set Current date


    // Request info on the floor from the server for the default floor (4)
    //TODO
  }

}
