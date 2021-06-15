import { Client } from '../../users/client-model';
import { Product } from '../../products/product-model';

export class Order {
  id?:string;
  choosedclient?: Client;
  choosedproduct?: Product;
  prixcmd?:number;
  qtycmd?:number;
  dateDeCommande?:Date;

}
