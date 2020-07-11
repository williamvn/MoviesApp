import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { TVShow, TVResponse } from '../model/tvshow';
import { Movie, MovieResponse } from '../model/movie';
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { forkJoin } from 'rxjs';


@Injectable()
export class DataService {
  API_KEY = "cea68b520beecac6718820e4ac576c3a";
  BASE_URI = "https://api.themoviedb.org/3/";
  LANGUAGE = "en-US";

  private tvshowSubject = new BehaviorSubject<TVShow[]>([]);
  tvshows$: Observable<TVShow[]> = this.tvshowSubject.asObservable();

  private movieSubject = new BehaviorSubject<Movie[]>([]);
  movies$: Observable<Movie[]> = this.movieSubject.asObservable();

  totalMoviePages: number;
  totalTVPages: number;
  private queryFlag: boolean;
  constructor(private httpClient: HttpClient) { }

  loadMovies(page = 1): Observable<boolean> {
    console.log("Getting Movies");
    if (this.queryFlag) {
      console.log("Cached Query");
      return new Observable<boolean>((observer) => observer.next(true));

    }
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', this.LANGUAGE)
      .set('page', "" + page);

    return this.httpClient.get(this.BASE_URI + "movie/popular", { params })
      .pipe(
        map((data: MovieResponse) => {
          this.movieSubject.next(data.results);
          this.totalMoviePages = data.total_pages;
          return true;
        }));
  }

  loadTVShows(page = 1): Observable<boolean> {
    if (this.queryFlag) {
      return new Observable<boolean>((observer) => observer.next(true));
    }
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', this.LANGUAGE)
      .set('page', "" + page);

    return this.httpClient.get(this.BASE_URI + `tv/popular`, { params })
      .pipe(
        map((data: TVResponse) => {
          this.tvshowSubject.next(data.results);
          this.totalTVPages = data.total_pages;
          return true;
        }));
  }

  unifiedSearchQuery(query: string, page: number = 1): void {
    if (query == "") {
      this.queryFlag = false;
      forkJoin(this.loadMovies(), this.loadTVShows()).subscribe();
    }
    else {
      this.queryFlag = true;
      console.log("searching " + query);
      forkJoin(this.searchQuery(query, page, "tv"), this.searchQuery(query, page, "movie"))
        .subscribe((response: [TVResponse, MovieResponse]) => {
          console.log("Result Collected");
          console.log(response);
          this.tvshowSubject.next(response[0].results);
          this.movieSubject.next(response[1].results);
        });
    }
  }

  private searchQuery(query: string, page: number, source: string) {
    console.log("Retrieving query:" + query + " from " + source);
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', this.LANGUAGE)
      .set('page', "" + page)
      .set('query', query);

    return this.httpClient.get<TVResponse | MovieResponse>(this.BASE_URI + `search/${source}/`, { params });
  }
}
