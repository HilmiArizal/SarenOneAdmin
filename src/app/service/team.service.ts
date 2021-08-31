import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public API_URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL.Local;
  }

  getTeam() {
    return this.http.get(this.API_URL + `team/getTeam`).pipe(
      tap((res) => console.log(res))
    )
  };

  addTeam(dataTeam: any, image: any) {
    let formData = new FormData();
    formData.append('data', JSON.stringify(dataTeam));
    formData.append('image', (image));
    return this.http.post(this.API_URL + `team/addTeam`, formData).pipe(
      tap((res) => console.log(res))
    )
  };

  editTeam(id: any, dataTeam: any, image: any) {
    console.log(dataTeam);
    console.log(image);
    let formData = new FormData();
    formData.append('data', JSON.stringify(dataTeam));
    formData.append('image', (image));
    return this.http.put(this.API_URL + `team/editTeam/${id}`, formData).pipe(
      tap((res) => console.log(res))
    )
  };

  deleteTeam(id: any) {
    return this.http.delete(this.API_URL + `team/deleteTeam/${id}`).pipe(
      tap((res) => console.log(res))
    )
  };

}
