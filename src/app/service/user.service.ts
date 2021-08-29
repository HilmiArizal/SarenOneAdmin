import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public API_URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL.Local;
  }

  changeProfile(id: any, dataProfile: any, img: any) {
    let formData = new FormData();
    formData.append('img', (img));
    formData.append('data', JSON.stringify(dataProfile));
    return this.http.put(this.API_URL + `user/changeProfile/${id}`, formData).pipe(
      tap((res) => console.log(res))
    )
  }

}