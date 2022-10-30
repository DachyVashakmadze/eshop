import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPersonalPageComponent } from './product-personal-page/product-personal-page.component';
import { ProductListComponent } from './product/product-list/product-list.component';

const routes: Routes = [
  { path: 'product/:id', component: ProductPersonalPageComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
