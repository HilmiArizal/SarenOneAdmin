import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public API_URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL.Local;
  }

  login(dataLogin: any){
    return this.http.post(this.API_URL + 'auth/login', dataLogin).pipe(
      tap((res) => console.log(res))
    )
  }
}
