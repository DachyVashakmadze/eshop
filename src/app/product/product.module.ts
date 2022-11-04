import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule} from '@angular/material/divider';
import { LayoutModule } from '@angular/cdk/layout'; 
import { MatIconModule } from '@angular/material/icon';
import { ProductPersonalPageComponent } from './product-personal-page/product-personal-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';


@NgModule({
  declarations: [
    ProductPersonalPageComponent,
    ProductListComponent,
    ProductListItemComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    LayoutModule
  ],
})
export class ProductModule { }
