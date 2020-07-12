import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ProductDetail } from 'src/app/model/product-detail';
import * as _ from "lodash";

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

  remove(id){
    _.remove(this.data.list, el => el.id == id);
    this.products = this.data.list;
  }
}
