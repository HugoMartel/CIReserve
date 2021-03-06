import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Reservation {
  id: number;
  begin: Date;
  end: Date;
  duration: number;
  user: string;
  reason: string;
  floor: number; // 956 i.e
  building: string; // "C" i.e


  constructor(
    @Inject(Number) private m_id: number,
    @Inject(Number) private b_hour: number,
    @Inject(Number) private b_minutes: number,
    @Inject(Number) private b_day: number,
    @Inject(Number) private b_month: number,
    @Inject(Number) private b_year: number,
    @Inject(Number) private e_hour: number,
    @Inject(Number) private e_minutes: number,
    @Inject(Number) private e_day: number,
    @Inject(Number) private e_month: number,
    @Inject(Number) private e_year: number,
    @Inject(String) private m_user: string,
    @Inject(String) private m_reason: string,
    @Inject(Number) private m_floor: number,
    @Inject(String) private m_building: string,

  ) {
    this.floor = m_floor;
    this.building = m_building;
    this.id = m_id;

    this.begin = new Date(
      b_day.toString() + '-' + b_month.toString() + '-' + b_year.toString()
    );
    this.begin.setHours(b_hour, b_minutes);
    this.end = new Date(
      e_day.toString() + '-' + e_month.toString() + '-' + e_year.toString()
    );
    this.begin.setHours(e_hour, e_minutes);
    this.duration = this.end.getDate() - this.begin.getDate();
    /* if begin and end are inverted */
    if (this.duration < 0) {
      let dateTmp = this.end;
      this.end = this.begin;
      this.begin = dateTmp;
      this.duration = Math.abs(this.duration);
    }
    /*m_user > 0 ?*/ (this.user = m_user) /*: (this.user = -1);*/
    this.reason = m_reason;
  }

  getInfosLogged = () => {
    return {
      beginHour: this.begin.getHours(),
      beginMinutes: this.begin.getMinutes(),
      endHour: this.end.getHours(),
      endMinutes: this.end.getMinutes(),
      duration: this.duration,
      reason: this.reason,
      user: this.user,
      floor: this.floor,
      building: this.building, 
    };
  };

  //hiding the username & the reason
  getInfosAnonymous = () => {
    return {
      beginHour: this.begin.getHours(),
      beginMinutes: this.begin.getMinutes(),
      endHour: this.end.getHours(),
      endMinutes: this.end.getMinutes(),
      duration: this.duration,
      floor: this.floor,
      building: this.building, 
    };
  };
}
