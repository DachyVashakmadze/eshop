import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { Breadcrumb } from '../breadcrumb/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcumbService {
  itemsSubject = new BehaviorSubject<Breadcrumb[]>([]);

  setItems(items: Breadcrumb[]) {
    this.itemsSubject.next(items);
  }
}
