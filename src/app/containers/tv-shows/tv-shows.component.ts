import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TVShow } from '../../model/tvshow';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit, OnDestroy {

  private tvShowSubcription: Subscription;
  tvshows: TVShow[] = [];
  totalPages: number;
  type: string = "tv";
  range: number = 5;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(p: number = 1) {
    this.data.loadTVShows(p).subscribe(success => {
      if (success) {
        this.tvShowSubcription = this.data.tvshows$.subscribe(m => {
          this.tvshows = m
          this.totalPages = this.data.totalTVPages;
          this.range = Math.min(5, this.totalPages);
        });
      }
      else {
        alert("The Movies Couldn't load");
      }
    });
  }

  ngOnDestroy(){
    this.tvShowSubcription.unsubscribe();
  }
}
