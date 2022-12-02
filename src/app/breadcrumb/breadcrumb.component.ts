import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, takeUntil } from 'rxjs';
import { Breadcrumb } from './breadcrumb.model';
import { BreadcumbService } from '../services/breadcumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {
  items: Breadcrumb[] = [];
  private breadcrumbSubscription!: Subscription;

  constructor(private service: BreadcumbService) {
    this.breadcrumbSubscription = this.service.itemsSubject.subscribe(breadcrumbItems => this.items = breadcrumbItems);
  }

  ngOnDestroy() {
    this.breadcrumbSubscription.unsubscribe();
  }

}
