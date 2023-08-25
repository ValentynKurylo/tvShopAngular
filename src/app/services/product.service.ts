import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:3000"

  constructor(private httpClient: HttpClient){ }

  getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url + '/product')
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(this.url + '/product/ById/' + id)
  }

  getTypes(): Observable<any>{
    return this.httpClient.get<any>(this.url + '/product/types')
  }
}
