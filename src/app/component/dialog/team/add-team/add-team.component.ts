import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Division } from 'src/app/interface/division';
import { Team } from 'src/app/interface/team';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  public formTeam: FormGroup;
  public changeImage: Boolean = false;
  public previewImage: any;
  public image: any;

  divisions?: Division[] = [
    { value: 'Regional Sales Manager', division: 'Regional Sales Manager' },
    { value: 'Area Sales Manager', division: 'Area Sales Manager' },
    { value: 'Sales Merchandiser', division: 'Sales Merchandiser' },
    { value: 'Sales Promotion Girls', division: 'Sales Promotion Girls' }
  ];

  constructor(
    private dialogRef: MatDialogRef<AddTeamComponent>,
  ) {
    this.formTeam = new FormGroup({
      fullname: new FormControl('', Validators.required),
      nickname: new FormControl('', Validators.required),
      phonenumber: new FormControl('', Validators.required),
      division: new FormControl('', Validators.required),
      motto: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
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

  onRemoveImage(){
    this.changeImage = false;
  }

  onClose(){
    this.dialogRef.close(null);
  }

  onAddTeam() {
    let data = this.formTeam.value;
    let image = this.image;
    let dataTeam = { data, image }
    this.dialogRef.close(dataTeam);
  }

}
