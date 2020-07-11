import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TVShow } from '../../model/tvshow';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {

  tvshows: TVShow[] = [];
  totalPages:number;
  type:string = "tv-show";
  range:number = 10;
  constructor(private data:DataService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(p:number = 1){
    this.data.loadTVShows(p).subscribe(success =>
      {
        if(success){
         this.data.tvshows$.subscribe(m => {
           this.tvshows = m
           this.totalPages = this.data.totalTVPages;
           this.range = Math.min(10, this.totalPages);
          });
        }
        else{
          alert("The Movies Couldn't load");
        }
    });
  }

}
