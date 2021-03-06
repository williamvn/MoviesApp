import { Injectable, Query } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { TVShow, TVResponse } from '../model/tvshow';
import { Movie, MovieResponse } from '../model/movie';
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { ProductDetail } from '../model/product-detail';


@Injectable()
export class DataService {
  API_KEY = "cea68b520beecac6718820e4ac576c3a";
  BASE_URI = "https://api.themoviedb.org/3/";
  LANGUAGE = "en-US";

  // Fields
  private tvshowSubject = new BehaviorSubject<TVShow[]>([]);
  private _tvshows$: Observable<TVShow[]> = this.tvshowSubject.asObservable();

  private movieSubject = new BehaviorSubject<Movie[]>([]);
  private _movies$: Observable<Movie[]> = this.movieSubject.asObservable();

  private _totalMoviePages: number;
  private _totalTVPages: number;

  private _list: ProductDetail[] = [];

  //Properties
  get movies$(){
    return this._movies$;
  }

  get tvshows$(){
    return this._tvshows$;
  }

  get totalMoviePages(){
    return this._totalMoviePages;
  }

  get totalTVPages(){
    return this._totalTVPages;
  }

  get list(){
    return this._list;
  }

  //Cache
  private cachedQuery: string = "";
  private cachedPage: number = 1;

  constructor(private httpClient: HttpClient) { }

  //Methods

  loadMovies(page = 1): Observable<boolean> {
    if (this.cachedQuery) {
      if (this.cachedPage != page) {
        this.unifiedSearchQuery(this.cachedQuery, page);
      }
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
          this._totalMoviePages = data.total_pages;
          return true;
        }));
  }

  loadTVShows(page = 1): Observable<boolean> {
    if (this.cachedQuery) {
      // console.log("cached Query " + this.cachedQuery);
      // console.log("cached page " + this.cachedPage + " vs page: " + page);
      if (this.cachedPage != page) {
        this.unifiedSearchQuery(this.cachedQuery, page);
      }
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
          this._totalTVPages = data.total_pages;
          return true;
        }));
  }

  searchMovieDetail(id=1):Observable<Movie>{
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', this.LANGUAGE)

    return this.httpClient.get<Movie>(this.BASE_URI + "movie/" + id, { params });
  }

  searchTVDetail(id=1):Observable<TVShow>{
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', this.LANGUAGE)

    return this.httpClient.get<TVShow>(this.BASE_URI + "tv/" + id, { params });
  }

  unifiedSearchQuery(query: string, page: number = 1): void {
    if (query == "" || (this.cachedQuery == query && this.cachedPage == page)) {
      forkJoin(this.loadMovies(), this.loadTVShows()).subscribe();
    }
    else {
      forkJoin(this.searchQuery(query, page, "tv"), this.searchQuery(query, page, "movie"))
        .subscribe((response: [TVResponse, MovieResponse]) => {
          this.tvshowSubject.next(response[0].results);
          this._totalTVPages = response[0].total_pages;

          this.movieSubject.next(response[1].results);
          this._totalMoviePages = response[1].total_pages;
        });
    }
    this.cachedQuery = query;
    this.cachedPage = page;
  }

  private searchQuery(query: string, page: number, source: string) {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', this.LANGUAGE)
      .set('page', "" + page)
      .set('query', query);

    return this.httpClient.get<TVResponse | MovieResponse>(this.BASE_URI + `search/${source}/`, { params });
  }
}
