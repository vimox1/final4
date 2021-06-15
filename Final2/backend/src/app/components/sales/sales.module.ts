import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SalesRoutingModule } from './sales-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { ClientlistService } from '../users/clientlist.service';
import { productService } from '../products/product.service';
import { OrdersService } from '../sales/orders/order.service';


import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {InputNumberModule} from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { TagModule } from 'primeng/tag';





@NgModule({
  declarations: [OrdersComponent, TransactionsComponent, OrderInfoComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    CardModule,FieldsetModule,ToolbarModule,TagModule,ButtonModule,TableModule,InputTextModule,ToastModule,InputNumberModule,DropdownModule,InputTextareaModule,
    FormsModule,
    ReactiveFormsModule
  ],providers: [
    
    ClientlistService,productService,OrdersService
  ]
})
export class SalesModule { }
