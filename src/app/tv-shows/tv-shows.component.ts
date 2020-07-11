import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { TVShow } from '../shared/model/tvshow';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {

  tvshows: TVShow[] = [];
  totalPages:number;
  type:string = "tv-show";
  constructor(private data:DataService) { }

  ngOnInit(): void {
    console.log("TV Show Component Initializating...");
    this.loadPage();
  }

  loadPage(p:number = 1){
    this.data.loadTVShows(p).subscribe(success =>
      {
        if(success){
         this.data.tvshows$.subscribe(m => this.tvshows = m);
         this.totalPages = this.data.totalTVPages;
        }
        else{
          alert("The Movies Couldn't load");
        }
    });
  }

}
