import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { productService } from '../../product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products = [];
  constructor( private productservice:productService,private router:Router,private messageService:MessageService) {}

  ngOnInit() {

    this._getProducts();
  }

  private _getProducts(){
  this.productservice.getProduct().subscribe(products=>{
    this.products=products;
  })
}

editProduit(produitId:string){
  this.router.navigateByUrl(`products/physical/add-product/${produitId}`);

}


supprimerProduit(productId:string){
  this.productservice.supprimerProduit(productId).subscribe(
    response=>{
      this.productservice.getProduct().subscribe((produit)=>{
        this.products=produit;
  
      });
      
      this.messageService.add({severity:'success', summary:'Success', detail:'Client supprimer'});

    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Client pas supprimer'});

    });
  
}


showProduct(produitId:string){
  this.router.navigateByUrl(`products/physical/product-detail/${produitId}`);
}

}
