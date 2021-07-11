import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  encrypt: boolean = true;
  constructor() {}

  ngOnInit() {}

  toggle = () => {
    this.encrypt = !this.encrypt;
  };
}
