import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductComponent } from './product/new-product/new-product.component';
import { NewCategoryComponent } from './category/new-category/new-category.component';

const routes: Routes = [
  // { path: 'product', component: ProductComponent },
  // { path: 'category', component: CategoryComponent },
  // { path: 'update-product/:id', component: NewProductComponent },
  // { path: 'new-product', component: NewProductComponent },
  // { path: 'update-category/:id', component: NewCategoryComponent },
  // { path: 'new-category', component: NewCategoryComponent },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
