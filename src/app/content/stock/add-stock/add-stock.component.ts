import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  public user: any;
  selectedProduct?: string;
  formStock: FormGroup;

  products?: Product[] = [
    { value: 'Bratwurst', productname: 'Bratwurst' },
    { value: 'Beef Cocktail', productname: 'Beef Cocktail' },
    { value: 'Chicken Cocktail', productname: 'Chicken Cocktail' }
  ];

  constructor() {
    this.formStock = new FormGroup({
      quantity: new FormControl("", Validators.required),
      productname: new FormControl("", Validators.required)
    });
  };

  ngOnInit(): void {
    this.getUser();
  };

  getUser() {
    const currentUser = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser!);
    this.user = user;
  }

  addStock() {
    let dataStock: any = new Object();
    dataStock.name = this.user.username;
    dataStock.productname = this.formStock.value.productname;
    dataStock.quantity = this.formStock.value.quantity;
    dataStock.year = moment().year();
    dataStock.month = moment().month() + 1;
    console.log(dataStock);
  };

};

interface Product {
  productname: string;
  value: string;
};
