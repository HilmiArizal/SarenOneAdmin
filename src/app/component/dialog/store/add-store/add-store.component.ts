import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {

  formStore: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddStoreComponent>
  ) { 
    this.formStore = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  };

  ngOnInit(): void {
  };

  onCancelAddStore(){
    this.dialogRef.close(null);
  }

  onAddStore(){
    if(this.formStore.valid){
      this.dialogRef.close(this.formStore.value);
    };
  }

}
