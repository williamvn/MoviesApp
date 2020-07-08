import { Component, OnInit, Input } from '@angular/core';
import { product } from '../shared/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input()
  products:product;
  
  constructor() { }

  ngOnInit(): void {
  }

}
