import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductPersonalPageComponent } from './product-personal-page/product-personal-page.component';
import { BaseProductService } from './services/base-product.service';
import { TestProductService } from './services/test-product.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';  

@NgModule({
  declarations: [
    AppComponent,
    ProductPersonalPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatGridListModule
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
