import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  public API_URL: string;

  public formProduct: FormGroup;
  public formProductOld: any;
  public changeImage: Boolean = false;
  public previewImage: any;
  public image: any;

  constructor(
    private dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) public dataProduct: any
  ) {
    this.API_URL = environment.API_URL.Local;
    this.formProductOld = dataProduct;
    this.formProduct = this.oldDataProduct(this.formProductOld);
  }

  ngOnInit(): void {
  }

  oldDataProduct(dataProduct: any) {
    const orderFormGroup: FormGroup = new FormGroup({});
    for (const item in dataProduct) {
      if (dataProduct.hasOwnProperty(item)) {
        const el = dataProduct[item];
        const control: FormControl = new FormControl(el, Validators.required);
        orderFormGroup.addControl(item, control);
      }
    }
    return orderFormGroup;
  };

  onChangeImage(e: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.changeImage = true;
      this.previewImage = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
    this.image = e.target.files[0];
  }

  onRemoveImage() {
    this.changeImage = false;
    this.previewImage = null;
  }

  cancelEditProduct(){
    this.dialogRef.close(null);
  }

  editProduct() {
    if(this.changeImage){
      let dataProduct: any = new Object();
      dataProduct.id = this.formProduct.get('_id')?.value;
      dataProduct.data = {
        name: this.formProduct.get('name')?.value,
        price: this.formProduct.get('price')?.value,
        weight: this.formProduct.get('weight')?.value,
        description: this.formProduct.get('description')?.value,
      }
      dataProduct.image = this.changeImage ? this.image : this.formProduct.get('image')?.value;
      this.dialogRef.close(dataProduct);
    }else{
      alert('Image tidak boleh kosong!'); 
    }
  }


}
