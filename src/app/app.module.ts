import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductPersonalPageComponent } from './product/product-personal-page/product-personal-page.component';
import { BaseProductService } from './services/base-product.service';
import { TestProductService } from './services/test-product.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import { Page404Component } from './page404/page404.component';  

@NgModule({
  declarations: [
    AppComponent,
    ProductPersonalPageComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatGridListModule,
    MatExpansionModule
  ],
  providers: [
    {
      provide: BaseProductService,
      useClass: TestProductService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
