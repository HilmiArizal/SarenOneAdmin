import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email', 'role', 'verification', 'action'];
  data!: MatTableDataSource<User>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser(){
    const search = "";
    this.userService.getUser(search).subscribe((res: any) => {
      this.data = res.data;
    })
  }

  getSearchUser(e: any){
    const search = e.target.value.trim();
    this.userService.getUser(search).subscribe((res: any) => {
      this.data = res.data;
    })
  }

  manageUser(dataUser: any, type: any){

  }

}
