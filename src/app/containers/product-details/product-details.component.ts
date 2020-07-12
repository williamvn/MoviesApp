import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  onList: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private data: DataService) { }

  ngOnInit(): void {
    console.log("Details");
    this.route.paramMap.subscribe(params => {
      var productType = params.get('product');
      var productId = +params.get('productId');
      if (productType === "movie") {
        this.data.movies$.subscribe(ms => {
          var movie = ms.find(m => m.id == productId);
          if (!movie) {
            this.data.searchMovieDetail(productId).subscribe(m => {
              movie = m;
              this.product = this.mapToProductDetail(movie);
            });
          }
          });
      }
      else if (productType == "tv-show") {
        this.data.tvshows$.subscribe(tvs => {
          this.product = tvs.find(tv => tv.id == productId);
          if(!this.product){
            this.data.searchTVDetail(productId).subscribe(tv => {this.product = tv});
          }
        });
      }
      else {
        this.router.navigate(["**"]);
      }
    });
    if (this.data.list.find(el => el.id == this.product.id)) {
      this.onList = true;
    }
  }

  private mapToProductDetail(movie: Movie): ProductDetail {
    return {
      id: movie.id,
      name: movie.title,
      first_air_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path
    }
  }

  counter(i: number) {
    i = Math.floor(i);
    return new Array(i);
  }

  addProduct() {
    this.onList = true;
    this.data.list.push(this.product);
  }
}
