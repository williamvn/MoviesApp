import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery:string = "";
  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  sendQuery(){
    console.log("Requesting to send query")
    this.data.unifiedSearchQuery(this.searchQuery);
  }
}
