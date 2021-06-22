import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ItemsService } from './services/itemsservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  value=0;
  itemsCount :any;
  isShown=false;
  constructor(private itemDb:ItemsService){
    
  }
  ngOnInit(){
    // this.itemDb.create({"coke":20,pepsi:10,soda:10});
    this.itemDb.getItems().subscribe(r=>{
      this.itemsCount=r;
      console.log(r);
    });
    
    // console.log(this.itemsCount);
  }
  updateSupplies(coke:HTMLInputElement,pepsi:HTMLInputElement,soda:HTMLInputElement){
    let cc:Number=Number(coke.value);
    let pc:Number=Number(pepsi.value);
    let sc:Number=Number(soda.value);
    const result:Boolean=(cc<=0 && pc<=0 && sc<=0);
    // if(cc=="" && pc == "" && sc == "")
    // alert("All fields are required");
     if(cc <= 0){
    alert("Values cannot be 0 or negative please recheck the values");
  return;}
    if(pc<=0){
    alert("Values cannot be 0 or negative please recheck the values");
  return;}
    if(sc<=0){
    alert("Values cannot be 0 or negative please recheck the values");
  return;  
  }else{
      this.itemsCount.coke=coke.value;
      this.itemsCount.pepsi=pepsi.value;
      this.itemsCount.soda=soda.value;
      this.itemDb.update(this.itemsCount).subscribe(r=>{
        this.itemsCount=r;
      });
    this.isShown=!this.isShown
    }

  }
  total(x:number){
    this.value+=x;
  }
  resetCount(){
    this.itemDb.reset();
    this.itemDb.getItems().subscribe(r=>{
      this.itemsCount=r;
      console.log(r);
    });
  }
  clear(){
    this.value=0;
    alert("Transaction canceled");
  }
  dispenseCoke(){
    if(this.value==0 && this.value<25){
      alert("add more amount");
    }
    else if(this.itemsCount.coke==0)
    alert("Coke is sold out");
    else{
      this.value-=25;
      alert("coke dispensed.Remaining amount returned is "+this.value);
      let val = this.itemsCount.coke;
      this.itemsCount.coke=val-1;
      this.itemDb.update(this.itemsCount).subscribe(r=>{
        this.itemsCount=r;
      });
      this.value=0;
    }
  }
  dispensePepsi(){
    if(this.value==0 && this.value<32){
      alert("add more amount");
    }
    else if(this.itemsCount.pepsi==0)
    alert("Pepsi is sold out");
    else{
      this.value-=32;
      alert("Pepsi dispensed.Remaining amount returned is "+this.value);
      let val = this.itemsCount.pepsi;
      this.itemsCount.pepsi=val-1;
      this.itemDb.update(this.itemsCount).subscribe(r=>{
        this.itemsCount=r;
      });
      this.value=0;
    }
  }
  dispenseSoda(){
    if(this.value < 47){
      alert("add more amount");
    }
    else if(this.itemsCount.soda==0)
    alert("Soda is sold out");
    else{
      this.value-=47;
      alert("Soda dispensed.Remaining amount returned is "+this.value);
      let val = this.itemsCount.soda;
      this.itemsCount.soda=val-1;
      this.itemDb.update(this.itemsCount).subscribe(r=>{
        this.itemsCount=r;
      });
      
      this.value=0;
    }
  }
}
