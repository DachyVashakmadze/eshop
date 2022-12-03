import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseProductService } from './services/base-product.service';
import { TestProductService } from './services/test-product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModule } from './product/product.module';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { Page404Component } from './page404/page404.component';
import { BaseCategoryService } from './services/base-categoryservice';
import { TestCategoryService } from './services/test-category.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule} from '@angular/material/sidenav';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CoolHoverDirective } from './common/cool-hover.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    Page404Component,
    SideMenuComponent,
    BreadcrumbComponent,
    CoolHoverDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatSliderModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatGridListModule,
    MatExpansionModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSidenavModule
  ],
  providers: [
    {
      provide: BaseProductService,
      useClass: TestProductService
    },
    {
      provide: BaseCategoryService,
      useClass: TestCategoryService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
