import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isScan=false;

  constructor() { 
    let scanStatus=localStorage.getItem('isScan')
    this.isScan=scanStatus?true:false;
  }

  ngOnInit(): void {
  }

}
