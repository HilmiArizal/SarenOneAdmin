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
  public data: any;
  public availableData: boolean = false;
  public API_URL: string;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog
  ) {
    this.API_URL = environment.API_URL.Server;
  }

  ngOnInit(): void {
    this.getTeam();
  }

  getTeam() {
    this.teamService.getTeam().subscribe((res: any) => {
      this.dataTeam = res.data;
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
          if(results){
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
          if(results){
            this.teamService.deleteTeam(results).subscribe((res) => {
              this.getTeam();
            })
          }
        })
        break;
    }
  }

}
