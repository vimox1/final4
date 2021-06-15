import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category} from './categorie-model'
@Injectable({
  providedIn: 'root'
})
export class categoryService {

  constructor(private http: HttpClient) { }

  getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:3000/products/physical/category');

  }
  createCategory(categorie:Category):Observable<Category>{
    return this.http.post('http://localhost:3000/products/physical/category',categorie)
  }

  supprimerCategory(id:string):Observable<Object>{
    return this.http.delete<Object>(`http://localhost:3000/products/physical/category/${id}`);
  }

}
