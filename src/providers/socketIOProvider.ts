import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { FactCard } from '../models/factCard';
import { AffirNegCard } from '../models/affirNegCard';
import * as socketIo from 'socket.io-client';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketIOProvider {

  private socket$: any;
  roomId: number;

  constructor(public http: Http) {

    this.socket$ = new socketIo('ws://localhost:3000');

    this.socket$.on('connect',(event)=>{
      console.log(event);
    });

    this.socket$.on('startGame', (event)=>{
      console.log(event);
      this.roomId = event;
    });

    this.socket$.on('availableRooms', (event)=>{
      console.log(event);
    });
  }

  startGame(){
    this.socket$.emit("startGame");
  }

  joinGame(){
    this.socket$.emit("getAvailableRooms");
  }

    
}




