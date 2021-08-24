import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL: string;

  constructor(private http: HttpClient) { 
    this.API_URL = environment.API_URL.Local;
  };

  getProduct(dataProduct: any) {
    let params = new HttpParams()
    .set("search", dataProduct.search)
    .set("currentPage", dataProduct.currentPage)
    .set("perPage", dataProduct.perPage)
    return this.http.get(this.API_URL + `product/getProduct?${params}`).pipe(
      tap((res) => console.log(res))
    )
  };

  addProduct(dataProduct: any){
    let formData = new FormData();
    formData.append('data', JSON.stringify(dataProduct.data));
    formData.append('image', (dataProduct.image));
    return this.http.post(this.API_URL + `product/addProduct`, formData).pipe(
      tap((res) => console.log(res))
    )
  }
  
  editProduct(dataProduct: any){
    let formData = new FormData();
    formData.append('data', JSON.stringify(dataProduct.data));
    formData.append('image', (dataProduct.image));
    return this.http.put(this.API_URL + `product/editProduct?id=${dataProduct.id}`, formData).pipe(
      tap((res) => console.log(res))
    )
  }

  deleteProduct(dataProduct: any){
    return this.http.delete(this.API_URL + `product/deleteProduct/${dataProduct.id}`).pipe(
      tap((res) => console.log(res))
    )
  }

}
