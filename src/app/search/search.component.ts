import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery:string = "";
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  sendQuery(){
    console.log(this.searchQuery);
  }
}
