import { Component, Input, OnInit, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-container',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor() { }

  @Input() label: any;
  @Input() errorMessage!: string;

  input: any;

  @ContentChild(NgModel) model!: NgModel;

  ngOnInit(): void {
  }

  ngAfterContentInit(){
    this.input =this.model;
    if(this.input == undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel');
    }
  }


  hasSuccess(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched);
  }


  hasError(): boolean{
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

  

}
