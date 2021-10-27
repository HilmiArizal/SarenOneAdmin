import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private API_URL: string;

  constructor(private http: HttpClient) { 
    this.API_URL = environment.API_URL.Local;
  };

  getStore(dataStore: any){
    let params = new HttpParams()
    .set("search", dataStore.search)
    .set("currentPage", dataStore.currentPage)
    .set("perPage", dataStore.perPage)
    return this.http.get(this.API_URL + `store/getStore?${params}`).pipe(
      tap((res) => console.log(res))
    )
  }

  addStore(dataStore: any){
    return this.http.post(this.API_URL + `store/addStore`, dataStore).pipe(
      tap((res) => console.log(res))
    )
  }

}
