import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { Page404Component } from './page404/page404.component';
import { ProductPersonalPageComponent } from './product/product-personal-page/product-personal-page.component';

const routes: Routes = [
  {
    path: "product/:id", component: ProductPersonalPageComponent
  },
  { 
    path: 'products', component: ProductListComponent
  },
  {
    path: "category/:id", component: ProductListComponent
  },
  { 
    path: "", component: ProductListComponent
  },
  {
    path: "**", component: Page404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
