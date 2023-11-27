import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:3001"

  constructor(private httpClient: HttpClient){ }

  postProduct(formData: any): Observable<any>{
    return this.httpClient.post<any>(this.url + '/product', formData, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    } )
  }

  getProducts(filteres: {
    choseType: string,
    choseMark: string,
    minPrice: any,
    maxPrice: any,
    minYear: any,
    maxYear: any,
    sortBy: string
  } | null): Observable<Product[]>{
    let currentUrl = this.url + `/product`
    if(filteres){
      console.log(filteres)
      currentUrl = this.url + `/product?`
      if(filteres.choseType){
        currentUrl += `type=${filteres.choseType}&`
      }
      if(filteres.choseMark){
        currentUrl += `name=${filteres.choseMark}&`
      }
      if(filteres.minPrice){
        currentUrl += `minPrice=${filteres.minPrice}&`
      }
      if(filteres.maxPrice){
        currentUrl += `maxPrice=${filteres.maxPrice}&`
      }
      if(filteres.minYear){
        currentUrl += `minYear=${filteres.minYear}&`
      }
      if(filteres.maxYear){
        currentUrl += `minPrice=${filteres.maxYear}&`
      }
      if(filteres.sortBy){
        currentUrl += `sortBy=${filteres.sortBy}&`
      }
    }

    console.log(currentUrl)
    return this.httpClient.get<Product[]>(currentUrl)
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(this.url + '/product/ById/' + id)
  }

  getTypes(): Observable<any>{
    return this.httpClient.get<any>(this.url + '/product/types')
  }

  getModels(type: string): Observable<any>{
    let currentUrl = this.url + '/product/models'
    if(type){
      currentUrl += `?type=${type}`
    }
    return this.httpClient.get<any>(currentUrl)
  }

  getProductsByFilters(type: string, mark: string, minYear: number, maxYear: number, minPrice: number, maxPrice: number):Observable<any>{
    let currentUrl = this.url + '/product/filters'
    if(type){
      currentUrl += `?type=${type}`
    }
    return this.httpClient.get<any>(this.url + '/product/filters')
  }

  upDateProductById(id: number, formData: any): Observable<any>{
    console.log(formData)
    return this.httpClient.put<any>(this.url + `/product/${id}`, formData, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  patchImage(image: any, id: number): Observable<any>{
    console.log(image)
    return this.httpClient.patch<any>(this.url + `/product/image/${id}`, image, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/product/' + id, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  addImage(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/images', body, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  getProductImagesByProductId(id: number): Observable<any>{
    return this.httpClient.get<any>(this.url + `/images/byProductId/${id}`,  {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }
}
