import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { FactCard } from '../../models/factCard';
import { AffirNegCard } from '../../models/affirNegCard';
import { DataProvider } from '../../providers/dataProvider'

@Component({
  selector: 'page-selection',
  templateUrl: 'selection.html',
  animations: [
    trigger('itemState', [
      state('in', style({transform: 'translateX(0)' })),
      //Enter
      transition('void => *', [
        style({
          transform: 'translateX(105%)'
        }),
        animate('1500ms 500ms ease-in')
      ])
    ]),
    trigger('itemStateFlipIn', [
      state('flipin', style({ transform: 'rotateY(0deg)'})), 
      transition('void => *', [
        style({
          transform: 'rotateY(-180deg)'
        }),
        animate('1500ms 500ms ease-in')
      ]),             
  ]),
  trigger('itemStateFlipOut', [     
    state('flipout', style({ transform: 'rotateY(180deg)'})),
    transition('void => *', [ 
      style({
        transform: 'rotateY(0deg)'
      }),    
      animate('1500ms 500ms ease-in')
    ]),
  ]),
  trigger('itemStateInY', [     
    state('in', style({ transform: 'translateY(0)'})),
    transition('void => *', [ 
      style({
        transform: 'translateY(450%)'
      }),    
      animate('1500ms 500ms ease-in')
  ]),
  ]),
]
})
export class SelectionPage {
  factCard: FactCard;
  affirNegCard: AffirNegCard;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  factItem: string = "in";
  choiceItem: string = "flipin";
  choiceItemNumber: string = "flipout";
  inputItem: string = "in";
  index: number;

  constructor(public dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
   this.factCard = this.navParams.get("factCard");
   this.affirNegCard = this.navParams.get("affirNegCard");   
  }

  sendAnswer(){
    this.viewCtrl.dismiss(true);
  }
}
