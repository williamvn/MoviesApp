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
  constructor(private data:DataService) { }

  ngOnInit(): void {
    console.log("TV Show Component Initializating...");
    this.data.loadTVShows().subscribe(success =>
      {
        if(success){
         this.tvshows = this.data.tvshows;
        }
        else{
          alert("The Movies Couldn't load");
        }
    });
  }

}
