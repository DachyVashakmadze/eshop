import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPersonalPageComponent } from './product-personal-page/product-personal-page.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path: "products", component: ProductListComponent},
  {path: "product/:id", component: ProductPersonalPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
