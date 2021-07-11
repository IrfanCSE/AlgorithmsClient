import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  encrypt: boolean = true;

  constructor() {}

  ngOnInit() {}
  
  toggle = () => {
    this.encrypt = !this.encrypt;
  };
}
