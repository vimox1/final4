import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from './product-model'
@Injectable({
  providedIn: 'root'
})
export class productService {

  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/products/physical/product-list');

  }
  createProduct(productData:FormData):Observable<Product>{
    return this.http.post<Product>('http://localhost:3000/products/physical/add-product',productData)
  }
  updateProduit(productData:FormData,id:string):Observable<Product>{
    return this.http.put<Product>(`http://localhost:3000/products/physical/add-product/${id}`,productData)
  }
  
   getProductById(productId:string):Observable<Product>{
    return this.http.get<Product>(`http://localhost:3000/products/physical/product-list/${productId}`);
  }

  supprimerProduit(productId:string):Observable<Object>{
    return this.http.delete<Object>(`http://localhost:3000/products/physical/product-list/${productId}`);
  }
  

  // findArtcilebyNom(nomProduit:string):Observable<Product>{
  //   return this.productService.findArtcilebyNom(nomProduit);
  // }

}
