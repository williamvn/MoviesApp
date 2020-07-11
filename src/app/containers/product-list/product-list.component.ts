import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../model/product';

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
  }

}
