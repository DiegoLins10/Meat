import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioOption } from './radio-option';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {


  @Input() options!: RadioOption[];

  value: any;
  onChange: any;

  constructor() { }

  ngOnInit(): void {
  }

  setValue(value: any){
    this.value = value;
    this.onChange(this.value);
  }

  /*
    WRITE A NEW VALUE TO THE ELEMENT
  */
  writeValue(obj: any): void {
    this.value = obj;
  }

  /*
    SET THE FUNCTION TO BE CALLED WHEN THE CONTROL RECEIVES A CHANGE EVENT
    BASICAMENTE REGISTRA QUANDO OCORRER UMA MUDANCA
  */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }
}
