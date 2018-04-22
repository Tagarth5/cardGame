import { Injectable } from '@angular/core';
import { FactCard } from "../models/factcard";
import { AffirNegCard } from "../models/affirNegCard";

@Injectable()
export class DataProvider {

  private factCards: FactCard[] = new Array();
  private affirNegCards: AffirNegCard[] = new Array();
  private score: number = 0;

  constructor() {
    this.affirNegCards[0] = {
      id: 1,
      text1: "Es posible que...",
      text2: "No es posible que...",
      factCardId: 0,
      used: false
    }

    this.factCards[0] = {
      id: 1,
      difficulty: 8,
      score: 50,
      text:  "La gran mayoría de los españoles habla ruso con fluidez",
      used: false 
    }
  }
}