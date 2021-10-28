import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from 'src/app/interface/store';

@Component({
  selector: 'app-delete-store',
  templateUrl: './delete-store.component.html',
  styleUrls: ['./delete-store.component.scss']
})
export class DeleteStoreComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteStoreComponent>, @Inject(MAT_DIALOG_DATA) public dataStore: Store
  ) { }

  ngOnInit(): void {
  }

  onCancelDeleteStore(){
    this.dialogRef.close(null);
  }

  onDeleteStore(dataStore: Store){
    this.dialogRef.close(dataStore._id);
  }

}
