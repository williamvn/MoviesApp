import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from '../shared/model/product-detail';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:ProductDetails;
  constructor(private route: ActivatedRoute, private data:DataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var productType = params.get('product');
      var productId = +params.get('productId');
      if(productType === "movie"){
        this.product = this.data.movies.find(m=>m.id == productId)[0];
      }
      else{
        this.product = this.data.tvshows.find(tv=>tv.id == productId)[0];
      }
    });

  }

}
