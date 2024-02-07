import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

type Datas = {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit{
  name = "";
  price = 0;
  dataJson : Datas[];




  constructor(private http: HttpClient) {
    this.dataJson = []
  }

  ngOnInit(): void {

  }

  add(name: string, price : string){
    const data = {
      name: name,
      price: price
    }
    const body = JSON.stringify(data)
    this.http.post("http://localhost:8080/goods", body,{
      headers: {
        'Content-Type' : 'application/json'
      }
    }).subscribe(
      {
        next: ((response:any) => {
          console.log(response)
        }),

        error: (err => {
          console.log(err);
        })
      }
    )
  }

  put(name: string, price: string){
    const data = {
      name: name,
      price: price
    }
    const body = JSON.stringify(data)
    this.http.put("http://localhost:8080/goods", body,{
      headers: {
        'Content-Type' : 'application/json'
      }
    }).subscribe(
      {
        next: ((response:any) => {
          console.log(response)
        }),

        error: (err => {
          console.log(err);
        })
      }
    )
  }

  delete(id : string){
    this.http.delete("http://localhost:8080/goods/" + id, {
      headers: {
        'Content-Type' : 'application/json'
      }
    }).subscribe(
      {
        next: ((response:any) => {
          console.log(response)
        }),

        error: (err => {
          console.log(err);
        })
      }
    )
  }

  getById(id : string){

    this.http.get("http://localhost:8080/goods/" + id).subscribe(
      {
        next: ((response:any) => {
          console.log(JSON.stringify(response));
          let obj = JSON.parse(JSON.stringify(response));
          console.log(`name: ${obj.name}`);
          this.name = obj.name;
          this.price = obj.price;
        }),

        error: (err => {
          console.log(err);
        })
      }
    )
  }

  getAll(){
    this.http.get("http://localhost:8080/goods").subscribe(
      {
        next: ((response:any) => {
          this.dataJson = JSON.parse(JSON.stringify(response)) as Datas[];
          console.log(JSON.stringify(response));
        }),

        error: (err => {
          console.log(err);
        })
      }
    )
  }


}
