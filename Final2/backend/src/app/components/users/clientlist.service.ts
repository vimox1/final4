import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Client} from './client-model'
@Injectable({
  providedIn: 'root'
})
export class ClientlistService {

  constructor(private http: HttpClient) { }

  getClient(): Observable<Client[]>{
    return this.http.get<Client[]>('http://localhost:3000/users/list-user');

  }
  createClient(client:Client):Observable<Client>{
    return this.http.post<Client>('http://localhost:3000/users/create-user',client)
  }

  supprimerClient(id:string):Observable<Object>{
    return this.http.delete<Object>(`http://localhost:3000/users/list-user/${id}`);
  }

  getClientByid(id:string):Observable<Client>{
    return this.http.get<Client>(`http://localhost:3000/users/list-user/${id}`);

  }
  updateClient(client:Client):Observable<Client>{
    return this.http.put<Client>('http://localhost:3000/users/list-user/'+ client.id,client);
  }

}
