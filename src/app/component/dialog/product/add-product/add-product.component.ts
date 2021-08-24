import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public formProduct: FormGroup;

  public changeImage: Boolean = false;
  public previewImage: any; 
  public image: any;

  constructor(
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {
    this.formProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    })
   }
  
  ngOnInit(): void {
  }

  onChangeImage(e: any){  
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
    this.previewImage = null;
  }

  cancelAddProduct(){
    this.dialogRef.close(null);
  }

  addProduct(){
    if(this.changeImage){
      let dataProduct: any = new Object();
      dataProduct.data = this.formProduct.value;
      dataProduct.image = this.image;
      this.dialogRef.close(dataProduct);
    }else{
      alert('Image tidak boleh kosong!');
    }
  }

}
