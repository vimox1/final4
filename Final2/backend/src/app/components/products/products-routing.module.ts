import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './physical/category/category.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';

import { ProductDetailComponent } from './physical/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'physical/category',
        component: CategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        }
      },
      {
        path: 'physical/sub-category',
        component: SubCategoryComponent,
        data: {
          title: "Sub Category",
          breadcrumb: "Sub Category"
        }
      },
      {
        path: 'physical/product-list',
        component: ProductListComponent,
        data: {
          title: "Product List",
          breadcrumb: "Product List"
        }
      },
      // {
      //   path: 'physical/product-detail',
      //   component: ProductDetailComponent,
      //   data: {
      //     title: "Product Detail",
      //     breadcrumb: "Product Detail"
      //   }
      // },
      {
        path: 'physical/add-product',
        component: AddProductComponent,
        data: {
          title: "Add Products",
          breadcrumb: "Add Product"
        }
      
      
      },
      {
        path: 'physical/product-detail/:id',
        component: ProductDetailComponent,
        data: {
          title: "Add Products",
          breadcrumb: "Add Product"
        }
      
      
      },
      {
        path: 'physical/product-list/:id',
        component: ProductDetailComponent,
        data: {
          title: "detail produit",
          breadcrumb: "detail produit"
        }
      
      
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
