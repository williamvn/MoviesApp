import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input()
  products:Product[];
  @Input()
  type:string;
  constructor() { }

  ngOnInit(): void {
    console.log("Type " + this.type);
    console.log("Product List Component Initializating...")
    console.log(this.products);
  }

}
