import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {


  @Output() rated = new EventEmitter<number>();

  rates: number[] = [1,2,3,4,5];

  rate: number = 0;
  previousRate?: number;

  constructor() { }

  ngOnInit(): void {
  }

  setRate(r: number){
    this.rate = r;
    this.previousRate = undefined;
    this.rated.emit(this.rate);
  }

  // cria uma animação de passar o mouse por cima
  // recebe o valor de onde o mouse está em cima
  // enquanto guarda o antigo valor selecionado em uma variavel temporaria 
  setTemporaryRate(r: number){
    if(this.previousRate === undefined){
      this.previousRate = this.rate;
    }
    this.rate = r;
  }

  //sempre que o mouse sai de cima do objeto sem ser pressionado
  // retorna o valor antigo para a variavel de rate principal
  // e limpa a variavel temporaria
  clearTemporaryRate(){
    if(this.previousRate != undefined){
      this.rate = this.previousRate;
      this.previousRate = undefined;
    }
  }
}
