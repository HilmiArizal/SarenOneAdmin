import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteProductComponent>, @Inject(MAT_DIALOG_DATA) public dataProduct: any
  ) { }

  ngOnInit(): void {
  }

  onDeleteClose(){
    this.dialogRef.close(null);
  }

  onDelete(id: any){
    let dataProduct: any = new Object();
    dataProduct.id = id;
    this.dialogRef.close(dataProduct);
  }

}
