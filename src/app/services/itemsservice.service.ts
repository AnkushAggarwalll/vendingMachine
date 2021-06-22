import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  url="https://fir-demo-b68c8-default-rtdb.firebaseio.com/vendingMachine.json";
  itemRef:any;
  constructor(private http : HttpClient) { 
    
  }
  reset(){
    this.http.put(this.url,{coke:10,pepsi:10,soda:10}).subscribe();
  }
  getItems(){
    return this.http.get(this.url);
  }
  update(itemsCount:any){
    // console.log(itemsCount);
    return this.http.put(this.url,itemsCount);
  }
  
}
