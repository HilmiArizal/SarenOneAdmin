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

}
