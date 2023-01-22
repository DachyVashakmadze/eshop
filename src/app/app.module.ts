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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Page404Component } from './page404/page404.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CartModule } from './cart/cart.module';
import { CartService } from './services/cart.service';
import { CookieService } from './services/cookie.service';
import { UserModule } from './user/user.module';
import { AuthInterceptor } from './common/auth-interceptor';
import { CategoryService } from './services/category.service';
import { MatDividerModule } from '@angular/material/divider';
import { CanActivateAuth } from './common/can-activate-auth';
import { CanActivateGuest } from './common/can-activate-guest';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    Page404Component,
    SideMenuComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    ProductModule,
    CartModule,
    UserModule,

    AppRoutingModule,
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
    MatSidenavModule,
    MatBadgeModule,
    MatDividerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CanActivateAuth,
    CanActivateGuest,
    {
      provide: BaseProductService,
      useClass: TestProductService
    },
    CategoryService,
    {
      provide: CartService,
      deps: [CookieService, BaseProductService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
