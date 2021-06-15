import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { productService } from '../../product.service';
import { categoryService } from '../category/categorie.service';
import { Product } from '../../product-model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  editmode = false;
  isSubmitted = false;
  ajouterProduit:FormGroup;
  categories = [];
  imageTelecharge : string | ArrayBuffer;
  productId : string



  constructor(private formBuilder: FormBuilder , private categoryservice : categoryService,private productService:productService,private messageService:MessageService,private route: ActivatedRoute) {  }

  

  //FileUpload
  

  onSubmit(){
    this.isSubmitted=true;
    if(this.ajouterProduit.invalid) return;
    const productFormData = new FormData();
    productFormData.append('nomProduit',this.ajouterProduit.controls.nomProduit.value);
    productFormData.append('refProduit',this.ajouterProduit.controls.refProduit.value);
    productFormData.append('refFourni',this.ajouterProduit.controls.refFourni.value);
    productFormData.append('image',this.ajouterProduit.controls.image.value);
    productFormData.append('description',this.ajouterProduit.controls.description.value);
    productFormData.append('priceDeVente',this.ajouterProduit.controls.priceDeVente.value);
    productFormData.append('priceDachat',this.ajouterProduit.controls.priceDachat.value);
    productFormData.append('tva',this.ajouterProduit.controls.tva.value);
    productFormData.append('category',this.ajouterProduit.controls.category.value);
    productFormData.append('numSurStock',this.ajouterProduit.controls.numSurStock.value);
    if(this.editmode){
      this.updateProduct(productFormData);
    }else{
      this.addProduit(productFormData);

    }


  }

  private updateProduct(productFormData: FormData) {
    console.log('rani khedam')
    this.productService.updateProduit(productFormData, this.productId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Le Produit a été modifié!'
        });
       
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'erreur lors de la modification du produit!'
        });
      }
    );
  }

  private addProduit(productData: FormData) {
    console.log('rani khedam')

    this.productService.createProduct(productData).subscribe((product: Product)=>{
      this.messageService.add({severity:'success', summary:'Success', detail: `Le Produit ${product.nomProduit} a été ajoute!`});
  
    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error',detail: 'erreur lors du lajoute de produit!'});
  
    })
  }
  



 
  

  ngOnInit() {
    this.ajouterProduit = this.formBuilder.group({
      nomProduit: ['',Validators.required],
      refProduit: ['',Validators.required],
      refFourni: ['',Validators.required],
      image: [''],
      description: ['',Validators.required],
      priceDeVente: ['',Validators.required],
      priceDachat: ['',Validators.required],
      tva: ['',Validators.required],
      category: ['',Validators.required],
      numSurStock: ['',Validators.required],
    })


     this.categoryservice.getCategory().subscribe(categories=>{
       this.categories = categories;
     });

    this.checkEditMode();
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.productId = params.id;
        this.productService.getProductById(params.id).subscribe((product)=>{
          this.ajouterProduit.controls.nomProduit.setValue(product.nomProduit);
          this.ajouterProduit.controls.refProduit.setValue(product.refProduit);
          this.ajouterProduit.controls.refFourni.setValue(product.refFourni);
          this.ajouterProduit.controls.description.setValue(product.description);
          this.ajouterProduit.controls.priceDeVente.setValue(product.priceDeVente);
          this.ajouterProduit.controls.priceDachat.setValue(product.priceDachat);
          this.ajouterProduit.controls.tva.setValue(product.tva);
          this.ajouterProduit.controls.category.setValue(product.category.id);
          this.ajouterProduit.controls.numSurStock.setValue(product.numSurStock);
          this.imageTelecharge = product.image;
          
        });
      }
    });
  }


  telechargerImage(event){
    console.log(event);
    const file = event.target.files[0]
    if(file){
      this.ajouterProduit.patchValue({image:file});
      this.ajouterProduit.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () =>{
        this.imageTelecharge=fileReader.result
      }
      fileReader.readAsDataURL(file);

        
    }
     
  }

  leGain(){
    return (this.ajouterProduit.value.priceDeVente)-(this.ajouterProduit.value.priceDachat*(this.ajouterProduit.value.tva/100))
  }
}
