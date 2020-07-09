import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import * as _ from "lodash";
import { TVShow } from '../shared/model/tvshow';
import { Movie } from '../shared/model/movie';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Movie|TVShow;
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    console.log("Details");
    this.route.paramMap.subscribe(params => {
      var productType = params.get('product');
      var productId = +params.get('productId');
      if (productType === "movie") {
        console.log(this.data.movies);
        this.product = this.data.movies.find(m=>m.id == productId);
      }
      else {
        this.product = this.data.tvshows.find(tv => tv.id == productId);
        console.log((this.product as TVShow).name);
      }
    });

  }

}
