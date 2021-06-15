import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from './order-model';
import { Client } from '../../users/client-model';
import { ClientlistService } from '../../users/clientlist.service';
import { productService } from '../../products/product.service';
import { Product } from '../../products/product-model';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { OrdersService } from './order.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ajoutercmd: FormGroup;

   orders : Order[] = []; 
   client : Array<Client> = []
   product : Array<Product> = []
   isSubmited :boolean = false;
  editmode=false;
  orderId:string;

   selectedClient : Client = {}
   selectedProduct : Product = {}
   


  constructor(private route:ActivatedRoute,private messageService:MessageService, private clientservice : ClientlistService,private productservice : productService,private formBuilder: FormBuilder,private orderservice : OrdersService) {}

  

  ngOnInit() {
    this.ajoutercmd = this.formBuilder.group({
      choosedclient: [''],
      choosedproduct: [''],
      prixcmd: [''],
      qtycmd: [''],
    })

    this._getClient();
    this._getProduit();
    this._checkEditMode();
  }


  private _getClient(){
  this.clientservice.getClient().subscribe(client=>{
    this.client=client;
  })
}

private _getProduit(){
  this.productservice.getProduct().subscribe(product=>{
    this.product=product;
  })
}
submit(){
  this.isSubmited=true;
      if(this.ajoutercmd.invalid){
        return;
      }
  
     const order : Order={
     choosedclient:this.ajoutercmd.controls.choosedclient.value,
     choosedproduct:this.ajoutercmd.controls.choosedproduct.value,
     prixcmd:this.ajoutercmd.controls.prixcmd.value,
     qtycmd:this.ajoutercmd.controls.qtycmd.value,}

     if(this.editmode){
      this._updateOrder(order);


    }else{
      this._addOrder(order);
    }

     this.orderservice.createOrder(order).subscribe()

    
     

   
}

private _updateOrder(order:Order){
  this.orderservice.updateOrder(order,this.orderId).subscribe((response)=>{
    this.messageService.add({severity:'success', summary:'Success', detail:'Client ajouter'});

  },(error)=>{
    this.messageService.add({severity:'error', summary:'Error', detail:'Client pas ajouter'});

  })

}

private _addOrder(order){
  this.orderservice.createOrder(order).subscribe(response=>{
    this.messageService.add({severity:'success', summary:'Success', detail:'Client ajouter'});

  },(error)=>{
    this.messageService.add({severity:'error', summary:'Error', detail:'Client pas ajouter'});

  })

}

private _checkEditMode(){
  this.route.params.subscribe((params)=>{
    if(params.id){
      this.editmode=true;
      this.orderId=params.id;
      this.orderservice.getOrderByid(params.id).subscribe(Order=>{
        this.ajoutercmd.controls.choosedclient.setValue(Order.choosedclient);
        this.ajoutercmd.controls.choosedproduct.setValue(Order.choosedproduct);
        this.ajoutercmd.controls.prixcmd.setValue(Order.prixcmd);
        this.ajoutercmd.controls.qtycmd.setValue(Order.qtycmd);
        

      })
    }
  })
}
 
}
