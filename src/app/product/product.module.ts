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
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs'; 
import { ProductCaruselComponent } from './product-carusel/product-carusel.component';
import { TimesDirective } from '../common/times.directive';
import { CoolHoverComponent } from '../common/cool-hover/cool-hover.component';

@NgModule({
  declarations: [
    ProductPersonalPageComponent,
    ProductListComponent,
    ProductListItemComponent,
    ProductCaruselComponent,
    CoolHoverComponent,
    TimesDirective
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    LayoutModule,
    MatTableModule,
    MatExpansionModule,
    MatTabsModule
  ],
})
export class ProductModule { }
