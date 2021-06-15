import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order-model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/sales/orders');
  }

  

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/sales/orders',order);
  }

  

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<Object>(`http://localhost:3000/sales/transactions/${orderId}`);
  }
  getOrderByid(orderId:string):Observable<Order>{
    return this.http.get<Order>(`http://localhost:3000/sales/orders/${orderId}`);

  }
  updateOrder(order:Order,orderId:string):Observable<Order>{
    return this.http.put<Order>(`http://localhost:3000/sales/orders/${orderId}`,order);
  }
}
