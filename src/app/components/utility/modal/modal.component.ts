import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  removeModal: boolean;
  showModal: boolean;

  @Input() title: string;
  @Input() size: string;
  @Input() confirmText: string;
  @Output() confirm = new EventEmitter();

  constructor() {
    this.removeModal = true;
    this.showModal = false;
    if(!this.size) {
      this.size = 'md'
    }
  }

  ngOnInit(): void {
  }

  public modalClose() {
    this.showModal = false;
    setTimeout(() => {
      this.removeModal = true;
    }, 500);
  }

  public modalOpen() {
    this.showModal = true;
    this.removeModal = false;
  }

  modalConfirm() {
    this.confirm.emit();
  }

}
