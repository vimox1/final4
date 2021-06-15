import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Client } from '../client-model';
import { ClientlistService } from '../clientlist.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  client: Client[] = [];

  constructor(private clientService: ClientlistService,private messageService:MessageService,private router:Router) {}


  ngOnInit() {
    this.clientService.getClient().subscribe((cliyan)=>{
      this.client=cliyan;

    });
  }
  supprimerClient(clientId:string){
    this.clientService.supprimerClient(clientId).subscribe(
      response=>{
        this.clientService.getClient().subscribe((cliyan)=>{
          this.client=cliyan;
    
        });
        
        this.messageService.add({severity:'success', summary:'Success', detail:'Client supprimer'});

      },(error)=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Client pas supprimer'});

      });
    
  }

  editClient(clientId:string){
    this.router.navigateByUrl(`users/create-user/${clientId}`)

  }
 

}

