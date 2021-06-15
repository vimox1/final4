import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Client } from '../client-model';
import { ClientlistService } from '../clientlist.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  ajouterClient: FormGroup;
  isSubmited :boolean = false;
  editmode=false;
  clientId:string;
  constructor(private formBuilder: FormBuilder,
    private  clientservice : ClientlistService,
    private messageService:MessageService,
    private route:ActivatedRoute) {}
  

  
  onSubmit(){
     this.isSubmited=true;
      if(this.ajouterClient.invalid){
        return;
      }
      const client : Client={
        id:this.clientId,
        refclient:this.ajouterClient.controls.refclient.value,
        nom:this.ajouterClient.controls.nom.value,
        prenom:this.ajouterClient.controls.prenom.value,
        fonction:this.ajouterClient.controls.fonction.value,
        adressepreso:this.ajouterClient.controls.adressepreso.value,
        adresselaivraison:this.ajouterClient.controls.adresselaivraison.value,
        codepostal:this.ajouterClient.controls.codepostal.value,
        ville:this.ajouterClient.controls.ville.value,
        genre:this.ajouterClient.controls.genre.value,
        Nbenfant:this.ajouterClient.controls.Nbenfant.value,
        datenaiss:this.ajouterClient.controls.datenaiss.value,
        };
        if(this.editmode){
          this._updateClient(client);


        }else{
          this._addClient(client);
        }

    // console.log(this.ajouterClient.controls.nom.value);
    // console.log(this.ajouterClient.controls.prenom.value);

  }
  private _updateClient(client:Client){
    this.clientservice.updateClient(client).subscribe((response)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Client ajouter'});

    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Client pas ajouter'});

    })

  }

  private _addClient(client){
    this.clientservice.createClient(client).subscribe(response=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Client ajouter'});

    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Client pas ajouter'});

    })

  }

  
  

  ngOnInit(): void{
    this.ajouterClient = this.formBuilder.group({
      refclient: ['',Validators.required], 
      nom: ['',Validators.required], 
      prenom: ['',Validators.required],
      fonction: ['',Validators.required], 
      adressepreso: ['',Validators.required],
      adresselaivraison: ['',Validators.required], 
      codepostal: ['',Validators.required],
      ville: ['',Validators.required], 
      genre: ['',Validators.required],
      Nbenfant: ['',Validators.required],
      datenaiss: ['',Validators.required],
    
    })
    this._checkEditMode();
  }
  
  private _checkEditMode(){
    this.route.params.subscribe((params)=>{
      if(params.id){
        this.editmode=true;
        this.clientId=params.id;
        this.clientservice.getClientByid(params.id).subscribe(Client=>{
          this.ajouterClient.controls.refclient.setValue(Client.refclient);
          this.ajouterClient.controls.nom.setValue(Client.nom);
          this.ajouterClient.controls.prenom.setValue(Client.prenom);
          this.ajouterClient.controls.fonction.setValue(Client.fonction);
          this.ajouterClient.controls.adressepreso.setValue(Client.adressepreso);
          this.ajouterClient.controls.adresselaivraison.setValue(Client.adresselaivraison);
          this.ajouterClient.controls.codepostal.setValue(Client.codepostal);
          this.ajouterClient.controls.ville.setValue(Client.ville);
          this.ajouterClient.controls.genre.setValue(Client.genre);
          this.ajouterClient.controls.datenaiss.setValue(Client.datenaiss);

        })
      }
    })
  }

}
