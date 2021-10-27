import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/interface/team';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {

  public formTeam: FormGroup;
  public formTeamOld: any;
  public API_URL: string;

  public image: any;
  public previewImage: any = undefined;
  public changeImage: Boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EditTeamComponent>, @Inject(MAT_DIALOG_DATA) public dataTeam: Team
  ) {
    this.formTeamOld = dataTeam;
    this.formTeam = this.oldDataTeamOld(this.formTeamOld);
    this.API_URL = environment.API_URL.Local;
  }

  ngOnInit(): void {
  }

  oldDataTeamOld(dataTeam: any) {
    const initFormGroup: FormGroup = new FormGroup({});
    for (let item in dataTeam) {
      if (dataTeam.hasOwnProperty(item)) {
        const el = dataTeam[item];
        const control: FormControl = new FormControl(el, Validators.required)
        initFormGroup.addControl(item, control)
      }
    }
    return initFormGroup;
  }

  onChangeImage(e: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.changeImage = true;
      this.previewImage = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
    this.image = e.target.files[0];
  }

  onChangeTeam() {
    let id = this.dataTeam._id;
    let dataTeam: Team = new Object();
    dataTeam.fullname = this.formTeam.get("fullname")?.value;
    dataTeam.nickname = this.formTeam.get("nickname")?.value;
    dataTeam.phonenumber = this.formTeam.get("phonenumber")?.value;
    dataTeam.division = this.formTeam.get("division")?.value;
    dataTeam.motto = this.formTeam.get("motto")?.value;
    let image = this.changeImage ? this.image : null;
    let data = { id, dataTeam, image };
    this.dialogRef.close(data);
  }

}
