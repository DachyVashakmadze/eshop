import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breadcrumb } from './breadcrumb.model';
import { BreadcumbService } from './breadcumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  items: Breadcrumb[] = [];
  private breadcrumbUpdateSubscription!: Subscription;

  constructor(private service: BreadcumbService) { }

  ngOnInit(): void {
    this.breadcrumbUpdateSubscription = this.service.onItemUpdate.subscribe(items => this.items = items);
  }

  ngOnDestroy() {
    this.breadcrumbUpdateSubscription.unsubscribe();
  }

}
