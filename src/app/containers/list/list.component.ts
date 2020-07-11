import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ProductDetail } from 'src/app/model/product-detail';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: ProductDetail[];
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.products = this.data.list;
  }

}
