import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  sendQuery(){
    console.log(this.searchQuery);
  }
}
