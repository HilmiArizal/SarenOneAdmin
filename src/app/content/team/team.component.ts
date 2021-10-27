import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTeamComponent } from 'src/app/component/dialog/team/add-team/add-team.component';
import { DeleteTeamComponent } from 'src/app/component/dialog/team/delete-team/delete-team.component';
import { EditTeamComponent } from 'src/app/component/dialog/team/edit-team/edit-team.component';
import { TeamService } from 'src/app/service/team.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public dataTeam: any;
  public totalData: any;
  public currentPage: any;
  public perPage: any;
  public availableData: boolean = false;
  public API_URL: string;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog
  ) {
    this.API_URL = environment.API_URL.Local;
  }

  ngOnInit(): void {
    this.getTeam();
  }

  getTeam() {
    let dataTeam: any = new Object();
    dataTeam.search = "";
    dataTeam.currentPage = 0;
    dataTeam.perPage = 3;
    this.teamService.getTeam(dataTeam).subscribe((res: any) => {
      this.dataTeam = res.data;
      this.totalData = res.total_data;
      this.currentPage = res.current_page;
      this.perPage = res.per_page;
      if (this.dataTeam.length === 0) {
        this.availableData = false;
      } else {
        this.availableData = true;
      }
    })
  }

  getListTeam(e: any) {
    this.currentPage = e.pageIndex;
    this.perPage = e.pageSize;
    let dataTeam: any = new Object();
    dataTeam.search = "";
    dataTeam.currentPage = this.currentPage;
    dataTeam.perPage = this.perPage;
    this.teamService.getTeam(dataTeam).subscribe((res: any) => {
      this.dataTeam = res.data;
      this.totalData = res.total_data;
      this.currentPage = res.current_page;
      this.perPage = res.per_page;
      if (this.dataTeam.length === 0) {
        this.availableData = false;
      } else {
        this.availableData = true;
      }
    })
  }

  getSearchTeam(e: any){
    let dataTeam: any = new Object();
    dataTeam.search = e.target.value.trim();
    dataTeam.currentPage = this.currentPage;
    dataTeam.perPage = this.perPage;
    this.teamService.getTeam(dataTeam).subscribe((res: any) => {
      this.dataTeam = res.data;
      this.totalData = res.total_data;
      this.currentPage = res.current_page;
      this.perPage = res.per_page;
      if (this.dataTeam.length === 0) {
        this.availableData = false;
      } else {
        this.availableData = true;
      }
    })
  }

  manageTeam(dataTeam: any, type: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dataTeam;
    dialogConfig.disableClose = true;
    switch (type) {
      case 'add':
        dialogConfig.minWidth = '50vw';
        const dialogAdd = this.dialog.open(
          AddTeamComponent,
          dialogConfig
        )
        dialogAdd.afterClosed().subscribe((results) => {
          if (results) {
            console.log(results);
            this.teamService.addTeam(results.data, results.image).subscribe((res) => {
              this.getTeam();
            })
          }
        })
        break;
      case 'edit':
        dialogConfig.minWidth = '50vw';
        const dialogEdit = this.dialog.open(
          EditTeamComponent,
          dialogConfig
        )
        dialogEdit.afterClosed().subscribe((results) => {
          if (results) {
            this.teamService.editTeam(results.id, results.dataTeam, results.image).subscribe((res) => {
              this.getTeam();
            })
          }
        })
        break;
      case 'delete':
        dialogConfig.minWidth = '30vw';
        const dialogDelete = this.dialog.open(
          DeleteTeamComponent,
          dialogConfig
        )
        dialogDelete.afterClosed().subscribe((results) => {
          if (results) {
            this.teamService.deleteTeam(results).subscribe((res) => {
              this.getTeam();
            })
          }
        })
        break;
    }
  }

}
