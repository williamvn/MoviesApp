import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { range } from 'rxjs';
import { build$ } from 'protractor/built/element';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Output() loadResourceByPage = new EventEmitter<number>();
  @Input() range: number = 10;
  @Input() totalPages:number;
  page: number = 1;
  minpage = 1
  maxpage = 1;
  currentPages: number[];
  constructor() { }

  ngOnInit(): void {
    this.maxpage = this.minpage + this.range;
    this.buildPagesArray();
  }

  nextPage() {
    this.page += 1;
    this.loadResourceByPage.emit(this.page);
    if (this.page > (this.maxpage + this.minpage) / 2) {
      this.currentPages.shift();
      this.currentPages.push(this.maxpage + 1);
      this.maxpage += 1;
      this.minpage += 1;
    }
  }

  previousPage() {
    this.page -= 1;
    this.loadResourceByPage.emit(this.page);
    if (this.page < (this.maxpage + this.minpage) / 2) {
      this.currentPages.pop();
      this.currentPages.unshift(this.minpage - 1);
      this.maxpage -= 1;
      this.minpage -= 1;
    }
  }

  loadPage(number) {
    this.page = number;
    this.loadResourceByPage.emit(this.page);
    var halfRange = this.minpage + ((this.maxpage - this.minpage)/2)
    this.minpage = number - halfRange < 1? 1 : number - halfRange;
    this.maxpage = number + halfRange > this.totalPages? this.totalPages : number + halfRange;
    this.buildPagesArray();
  }

  buildPagesArray(){
    this.currentPages = [];
    for (let i = this.minpage; i <= this.maxpage; i++) {
      this.currentPages.push(i);  
    }
  }

}
