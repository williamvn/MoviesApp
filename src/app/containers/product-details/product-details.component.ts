import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as _ from "lodash";
import { TVShow } from '../../model/tvshow';
import { Movie } from '../../model/movie';
import { ProductDetail } from '../../model/product-detail';
import { map, filter } from "rxjs/operators";

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
        this.data.movies$.subscribe(ms => {
          var movie = ms.find(m => m.id == productId);
          this.product = this.mapToProductDetail(movie);
        });
      }
      else {
        this.data.tvshows$.subscribe(tvs => {
          this.product = tvs.find(tv => tv.id == productId);
        });
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
