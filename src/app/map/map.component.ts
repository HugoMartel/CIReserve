import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  current_button:number;

  constructor(private bookService:BookService) {
    this.current_button = 3;
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
    }
  }

  //
  dateUpdateCallback() {
    let date = (document.getElementById('selectDate') as HTMLInputElement).value;
    let beginTime = (document.getElementById('beginTime') as HTMLInputElement).value;
    let endTime = (document.getElementById('endTime') as HTMLInputElement).value;

    if(date == null && beginTime == null && endTime == null){
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

        } else if (response.rooms !== undefined) {
          // Create the area elements and associated modals
          //TODO
        } else {
          console.error("wrong response...");
        }
      }else {
        console.error("no response...");
      }
    });
  }


  ngOnInit(): void {
    (document.getElementById("selectDate") as HTMLInputElement).addEventListener("change", this.dateUpdateCallback);
    (document.getElementById("beginTime") as HTMLInputElement).addEventListener("change", this.dateUpdateCallback);
    (document.getElementById("endTime") as HTMLInputElement).addEventListener("change", this.dateUpdateCallback);


    // Set Current date


    // Request info on the floor from the server for the default floor (4)
    //TODO
  }

}
