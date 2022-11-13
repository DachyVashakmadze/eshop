import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { Breadcrumb } from './breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcumbService {
  private _items: Breadcrumb[] = [];
  onItemUpdate: BehaviorSubject<Breadcrumb[]>;

  constructor() {
    this.onItemUpdate = new BehaviorSubject(this._items);
  }

  setItems(items: Breadcrumb[]) {
    this._items = items;
    this.update();
  }
  
  addItem(item: Breadcrumb) {
    this._items.push(item);
    this.update();
  }

  private update() {
    this.onItemUpdate.next(this._items);
  }
}
