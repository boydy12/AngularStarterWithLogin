import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.scss']
})
export class SideBarItemComponent implements OnInit {

  @Input() route: string;
  @Input() icon: string;
  constructor() { }

  ngOnInit(): void {
  }

}
