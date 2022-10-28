import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';
import { ProductPersonalPageComponent } from './product-personal-page/product-personal-page.component';

const routes: Routes = [
  {
    path: "product/:id", component: ProductPersonalPageComponent
  },
  { 
    path: "", component: AppComponent 
  },
  {
    path: "**", component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
