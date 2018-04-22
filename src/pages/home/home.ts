import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {SelectionPage} from '../selection/selection';
import { FactCard } from '../../models/factCard';
import { AffirNegCard } from '../../models/affirNegCard';
import { DataProvider } from '../../providers/dataProvider';
import { ApiProvider } from '../../providers/api';
import { LoadingController, Loading } from 'ionic-angular';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';


export class Message {
  constructor(
      public sender: string,
      public content: string,
      public isBroadcast = false,
  ) { }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private socket$: any;
  public serverMessages = new Array<Message>();

  loading: any;

  puntuacion: number;
  factCards: FactCard[] =  new Array();
  affirNegCards: AffirNegCard[] = new Array();
  score: number;
  roomId: number;

  public clientMessage = '';
  public isBroadcast = true;
  public sender = '';

  constructor(public apiProvider: ApiProvider, public loadingCtrl: LoadingController, public dataProvider: DataProvider, public navCtrl: NavController, public modalCtrl: ModalController) {

    this.loading = this.loadingCtrl.create({
      content: 'Please, wait for your turn...'
    });
    
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

  openSelection(index: number){
    let factCard = this.factCards[index];
    let affirNegCard = this.affirNegCards[index];
    let profileModal = this.modalCtrl.create(SelectionPage, { factCard: factCard, affirNegCard: affirNegCard });
    profileModal.present();

    profileModal.onWillDismiss((data)=>{
      if(data){
        this.factCards[index].used = true;
        this.socket$.send(JSON.stringify({roomId: this.roomId}));
        this.loading = this.loadingCtrl.create({
          content: 'Please, wait for your turn...'
        });
        this.loading.present();
      }
    })

    const message = new Message(this.sender, this.clientMessage, this.isBroadcast);
    this.serverMessages.push(message);
    
  }

  generateScores(): Observable<boolean>{
    return Observable.create(observer => {
       
      this.factCards.forEach((card,index) => {
        card.score = this.getRandomInt(-100, 100);
        if(index == this.factCards.length-1){         
          this.sortCards().subscribe(()=>{
            observer.next();
            observer.complete();
          });
        } 
       
      });
      
    });
  
  }

  sortCards(): Observable<boolean>{

    return Observable.create(observer => {
      this.factCards.sort((a, b) => {
      
        if (Math.abs(a.score) > Math.abs(b.score)) {
          return -1;
        }
        if (Math.abs(a.score) < Math.abs(b.score) ){
          return 1;
        }
        // a must be equal to b
        return 0;
      });   
      
      observer.next();
      observer.complete();
    });
   
  }

  getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } 

  shuffleArray(array) {
    array.sort(function() {
      return .5 - Math.random();
    });

    console.log(array);
  }

  assignCards(){

    this.shuffleArray(this.affirNegCards);

    this.affirNegCards.forEach((card,index) => {
        this.affirNegCards[index].factCardId = this.factCards[index].id;       
        if(index == this.affirNegCards.length-1){   
               
        }
    });
  }  

}
