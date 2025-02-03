import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  base = "";
  http=inject(HttpClient)
  constructor() { }

  getSaldo(){
    return this.http.get(`${this.base}/saldo`);
  }
  getMovementsDay(){
    return this.http.get(`${this.base}/movimentiGiorno`);
  }

  getMovementsWeek(){
    return this.http.get(`${this.base}/movimentiSettimana`);
  }

  getMovementsMonth(){
    return this.http.get(`${this.base}/movimentiMese`);
  }

  getAllYear(){
    return this.http.get(`${this.base}/allExistingYears`);
  }

  getAllMonthByYear(year:string){
    return this.http.get(`${this.base}/allExistingMonthByYears?year=${year}`);
  }



  addMovement(body:any){

    return this.http.post(`${this.base}/aggiungiSpesa`, body)
  }

  confrontYears(anni:string[]){
    return this.http.get(`${this.base}/confrontaAnni?anni=${anni.toString()}`);
  }
  confrontMonths(anno:string,mesi:string[]){
    return this.http.get(`${this.base}/confrontaMesi?anno=${anno}&mesi=${mesi.toString()}`);

  }

}
