import { Component, OnInit, Output, EventEmitter, Input, OnChanges, DoCheck } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Output() loadResourceByPage = new EventEmitter<number>();
  @Input() totalPages: number;
  @Input() range: number = 10;
  page: number = 1;
  minpage = 1
  maxpage = 1;
  currentPages: number[];
  constructor() { }

  ngOnInit(): void {
    this.maxpage = this.minpage + this.range;
    this.buildPagesArray();
  }

  ngOnChanges(){
    console.log("total Pages:" + this.totalPages);
    console.log("Range:" + this.range);
    this.minpage = 1;
    this.maxpage = this.minpage + this.range;
    this.buildPagesArray();
  }

  nextPage() {
    console.log(this.range);
    if (this.page < this.totalPages) {
      this.page += 1;
      this.loadResourceByPage.emit(this.page);
      if (this.page > Math.floor((this.maxpage + this.minpage) / 2) && this.maxpage < this.totalPages) {
        this.currentPages.shift();
        this.currentPages.push(this.maxpage + 1);
        this.maxpage += 1;
        this.minpage += 1;
      }
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.loadResourceByPage.emit(this.page);
      if (this.page < Math.floor((this.maxpage + this.minpage) / 2) && this.minpage > 1) {
        this.currentPages.pop();
        this.currentPages.unshift(this.minpage - 1);
        this.maxpage -= 1;
        this.minpage -= 1;
      }
    }
  }

  loadPage(numberPage: number) {
    this.page = numberPage;
    this.loadResourceByPage.emit(this.page);
    var halfRange = Math.floor(this.range / 2);
    this.minpage = numberPage - halfRange < 1 ? 1 : numberPage - halfRange;
    halfRange = this.range % 2 == 0 ? halfRange - 1 : halfRange;
    halfRange += 1;
    this.maxpage = numberPage + halfRange > this.totalPages ? this.totalPages : numberPage + halfRange;
    this.buildPagesArray();
  }

  buildPagesArray() {
    // const iter = range(this.minpage, this.maxpage);
    // iter.subscribe(i=>this.currentPages.push(i));
    console.log("Building Array Pages");
    this.currentPages = [];
    for (let i = this.minpage; i < this.maxpage; i++) {
      this.currentPages.push(i);
    }
  }

}
