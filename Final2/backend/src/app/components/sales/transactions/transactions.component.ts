import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { transactionsDB } from 'src/app/shared/tables/transactions';
import { Order } from '../orders/order-model';
import { OrdersService } from '../orders/order.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  order: Order[] = []


  constructor(private orderservice : OrdersService, private router:Router,private messageService:MessageService) {}

  
  
ngOnInit(){
  this.orderservice.getOrders().subscribe((cmd)=>{
    this.order=cmd;

  });}

  supprimercmd(cmdId:string){
    this.orderservice.deleteOrder(cmdId).subscribe(
      response=>{
        this.orderservice.getOrders().subscribe((orders)=>{
          this.order=orders;
    
        });
        
        this.messageService.add({severity:'success', summary:'Success', detail:'Client supprimer'});

      },(error)=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Client pas supprimer'});

      });
    
  }

  editOrder(orderId:string){
    this.router.navigateByUrl(`sales/orders/${orderId}`)

  }
  showCmd(orderId:string){
    this.router.navigateByUrl(`sales/order-info/${orderId}`)
    
  }
}
