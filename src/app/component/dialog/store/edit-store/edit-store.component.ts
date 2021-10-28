import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from 'src/app/interface/store';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit {

  public formStore: FormGroup;
  public formStoreOld: any;

  constructor(
    private dialogRef: MatDialogRef<EditStoreComponent>, @Inject(MAT_DIALOG_DATA) public dataStore: Store
  ) {
    this.formStoreOld = this.dataStore;
    this.formStore = this.oldDataStore(this.formStoreOld);
  }

  ngOnInit(): void {

  }

  oldDataStore(dataStore: any) {
    const orderFormGroup: FormGroup = new FormGroup({});
    for (const item in dataStore) {
      if (dataStore.hasOwnProperty(item)) {
        const el = dataStore[item];
        const control: FormControl = new FormControl(el, Validators.required);
        orderFormGroup.addControl(item, control);
      }
    }
    return orderFormGroup;
  };

  onCancelEditStore() {
    this.dialogRef.close(null);
  }

  onEditStore() {
    if(this.formStore.valid){
      this.dialogRef.close(this.formStore.value);
    }
  }

}
