import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import * as _ from "lodash";
import { TVShow } from '../shared/model/tvshow';
import { Movie } from '../shared/model/movie';
import { mapTo } from 'rxjs/operators';
import { ProductDetail } from '../shared/model/product-detail';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: ProductDetail;
  stars: number[];
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    console.log("Details");
    this.route.paramMap.subscribe(params => {
      var productType = params.get('product');
      var productId = +params.get('productId');
      if (productType === "movie") {
        var movies = this.data.movies.find(m => m.id == productId);
        this.product = this.mapToProductDetail(movies);
      }
      else {
        this.product = this.data.tvshows.find(tv => tv.id == productId);
      }
    });
  }

  private mapToProductDetail(movie: Movie): ProductDetail {
    return {
      name: movie.title,
      genre_ids: movie.genre_ids,
      first_air_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      origin_country: null
    }
  }

  counter(i: number) {
    i = Math.floor(i);
    return new Array(i);
  }
}
