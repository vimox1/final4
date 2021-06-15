import { Component, OnInit } from '@angular/core';
import { Order } from '../orders/order-model';
import { Client } from '../../users/client-model';
import { Product } from '../../products/product-model';

import { ClientlistService } from '../../users/clientlist.service';
import { productService } from '../../products/product.service';
import { OrdersService } from '../orders/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
  orders:  Order;
  client : Array<Client> = []
   product : Array<Product> = []

  constructor(private route:ActivatedRoute, private clientservice : ClientlistService,private productservice : productService,private orderservice : OrdersService) {}

  ngOnInit(): void {
    this._getOrder
    this._getClient
    this. _getProduit()
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
  
  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderservice.getOrderByid(params.id).subscribe((order) => {
          this.orders = order;
        });
      }
    });
  }

  

}
