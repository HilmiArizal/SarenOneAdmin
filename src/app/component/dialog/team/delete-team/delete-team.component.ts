import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/interface/team';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.scss']
})
export class DeleteTeamComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteTeamComponent>, @Inject(MAT_DIALOG_DATA) public dataTeam: Team
  ) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close(null);
  }

  onDeleteTeam(){
    this.dialogRef.close(this.dataTeam._id);
  }

}
