import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit{

  //to hold all contacts
  allContacts:any=[]
  isLoading:boolean = true
  errorMsg:string=''
  todaydate:Date = new Date()
  searchKey:string=""

  constructor(private api:ApiService){

  }
  ngOnInit(): void {
   this.getAllContacts()
  }

  //get all contacts
  getAllContacts(){
    this.api.getAllContacts().subscribe({
      next:(response:any)=>{
        console.log(response);
        setTimeout(() => {
          this.allContacts = response
          this.isLoading = false
        }, 2000);
      },
      error:(err:any)=>{
        console.log(err.message);
        this.errorMsg = err.message
        this.isLoading= false
      }
     }
     )
  }



  //deleteContact
  deleteContact(id:any){
    //call delet api from api service
    this.api.deleteContact(id).subscribe({
      next:(response:any)=>{
        this.getAllContacts()
      }
    })
  }
}
