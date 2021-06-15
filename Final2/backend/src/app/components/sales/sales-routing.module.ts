import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderInfoComponent } from './order-info/order-info.component';
import { OrdersComponent } from './orders/orders.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
        data: {
          title: "Orders",
          breadcrumb: "Orders"
        }
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
          title: "Transactions",
          breadcrumb: "Transactions"
        }
      },
      {
        path: 'order-info',
        component: OrderInfoComponent,
        data: {
          title: "Transactions",
          breadcrumb: "Transactions"
        }
      },
      {
        path: 'orders/:id',
        component: OrdersComponent,
        data: {
          title: "Create User",
          breadcrumb: "Create User"
        }
      },
      {
        path: 'order-info/:id',
        component: OrderInfoComponent,
        data: {
          title: "Create User",
          breadcrumb: "Create User"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
