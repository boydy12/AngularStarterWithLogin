import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  public userInput: string;

  @Input() label: string = "";
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter();
  @Input() type: string = "text";

  constructor() { }

  ngOnInit(): void {
  }
  
  modelChange() {
    this.inputModelChange.emit(this.inputModel);
  }

}
