import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductPersonalPageComponent } from './product-personal-page/product-personal-page.component';
import { BaseProductService } from './services/base-product.service';
import { TestProductService } from './services/test-product.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ProductModule } from './product/product.module';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSliderModule,
    ProductModule,
    MatButtonModule
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
