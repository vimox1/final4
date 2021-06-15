import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@ks89/angular-modal-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { productService } from '../../product.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Product } from '../../product-model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductDetailComponent implements OnInit {
  produit:Product;
 
  constructor(private productservice:productService , private route: ActivatedRoute) {
    
  }

  

  ngOnInit() {
    this.getProductInfo();
  }
  private getProductInfo(){
    this.route.params.subscribe(params=>{
      if(params.id){
      this.productservice.getProductById(params.id).subscribe((produit)=>{
        this.produit=produit
      })}


    })


  }

}
