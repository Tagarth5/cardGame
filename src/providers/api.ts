import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { FactCard } from '../models/factCard';
import { AffirNegCard } from '../models/affirNegCard';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: Http) {
    
  }

  getFactCards(): Observable<FactCard[]>{
    return this.http.get('http://localhost:8999/factCards').map(res => res.json())
  }

  getAffirNegCards(): Observable<AffirNegCard[]>{
    return this.http.get('http://localhost:8999/affirNegCards').map(res => res.json())
  }

  setAffirNegCard(): Observable<any>{
    let affirNegCard = {
      id: 1,
      text1: "Es posible que...",
      text2: "No es posible que...",
    }

    return this.http.post('http://localhost:8999/affirNegCard',affirNegCard);
  }

  setFactCard(): Observable<any>{

    let factCard = {
      id: 1,
      text:  "La gran mayoría de los españoles habla ruso con fluidez"
    }

    return this.http.post('http://localhost:8999/factCard',factCard);
  }

}
