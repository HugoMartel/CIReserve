import { Injectable, Inject } from '@angular/core';
import { Reservation } from './reservation.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  id: number;
  floor: number;
  building: string;
  /*
   * +----------+--------+
   * | building | number |
   * +----------+--------+
   * | A        |      1 |
   * | B        |      2 |
   * | C        |      3 |
   * +----------+--------+
   */
  nbPerson: number;
  hasProj: boolean;
  nbPlug: number;
  hasPlug: boolean;
  planning: Array<Reservation>;
  imgPos: Array<number>; // number sequence containing "control points" of the img, in order to trace it
  other: string;
  roomSize_m2:number;

  constructor(
    @Inject(Number) private m_id: number,
    @Inject(Number) private m_floor: number,
    @Inject(String) private m_building: string,
    @Inject(Number) private m_nbPerson: number,
    @Inject(Boolean) private m_hasProj: boolean,
    @Inject(Number) private m_nbPlug: number,
    m_plan: Array<Reservation>,
    m_pos: Array<number>,
    @Inject(String) private m_other:string,
    @Inject(Number) private m_roomSize_m2:number,
  ) {
    this.id = m_id;
    this.floor = m_floor;
    this.nbPerson = m_nbPerson;
    this.hasProj = m_hasProj;
    this.building = m_building;
    this.nbPlug = m_nbPlug;
    this.hasPlug = this.nbPlug ? true : false;
    this.planning = m_plan;
    this.imgPos = m_pos;
    this.other = m_other;
    this.roomSize_m2 = m_roomSize_m2;
  }

  //function to re organise the planning by date, technically working xd
  organize = () => {
    //filtering the array of reservation
    this.planning.sort((a: Reservation, b: Reservation): number => {
      if (a.begin.getDate() == b.begin.getDate()) return 0;
      else {
        let result = 0;
        a.begin.getDate() < b.begin.getDate() ? result - 1 : (result = 1);
        return result;
      }
    });
  };
}
