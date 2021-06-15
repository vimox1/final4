import { Component, OnInit } from '@angular/core';
import { categoryDB } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Category } from './categorie-model';
import { categoryService } from './categorie.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CouponsModule } from 'src/app/components/coupons/coupons.module';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})


export class CategoryComponent implements OnInit {
  public closeResult: string;
  categori: Category[] = [];
  ajouterCategory: FormGroup;


  constructor(private modalService: NgbModal,private categorieService: categoryService,private messageService:MessageService,private router:Router,private formBuilder: FormBuilder) {}
  

  ngOnInit() {
    this.ajouterCategory = this.formBuilder.group({
      nomCategory: ['',Validators.required], 
      numCategory: ['',Validators.required], 
    })


    this.categorieService.getCategory().subscribe((categorie)=>{
      this.categori=categorie;

    });
  }


  supprimerCategory(CategoryId:string){
    this.categorieService.supprimerCategory(CategoryId).subscribe(
      response=>{
        this.categorieService.getCategory().subscribe((categ)=>{
          this.categori=categ;
    
        });
        
        this.messageService.add({severity:'success', summary:'Success', detail:'Client supprimer'});

      },(error)=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Client pas supprimer'});

      });
    
  }

  onSubmit(){
    const categorie : Category={
      nomCategory:this.ajouterCategory.controls.nomCategory.value,
      numCategory:this.ajouterCategory.controls.numCategory.value,
    }


      this.categorieService.createCategory(categorie).subscribe((response)=>{
        this.messageService.add({severity:'success', summary:'Success', detail:'Client ajouter'});
  
      },(error)=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Client pas ajouter'});
  
      })
    }

    

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


 

 
}
