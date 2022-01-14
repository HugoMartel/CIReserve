import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.scss']
})
export class ConnectedComponent implements OnInit {

  constructor(private authService:RequestService) { }

  accountDisconnect() {
    this.authService.logout();
    /* 5s success notification */
    Notify.info("Vous avez été déconnecté.", {
      timeout: 5000,
      position: 'center-top',
      clickToClose: true
    });
    location.reload();
  }

  ngOnInit(): void {
  }

}
