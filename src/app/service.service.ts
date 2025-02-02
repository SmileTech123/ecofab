import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  base = "http://localhost:3000";
  http=inject(HttpClient)
  constructor() { }

  getSaldo(){
    return this.http.get(`${this.base}/saldo`);
  }
  getMovements(){
    return this.http.get(`${this.base}/movimenti`);
  }
}
