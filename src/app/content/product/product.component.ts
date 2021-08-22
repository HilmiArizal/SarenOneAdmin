import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductComponent } from 'src/app/component/dialog/product/add-product/add-product.component';
import { DeleteProductComponent } from 'src/app/component/dialog/product/delete-product/delete-product.component';
import { EditProductComponent } from 'src/app/component/dialog/product/edit-product/edit-product.component';
import { Other, PaginateData } from 'src/app/interface/other';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public API_URL: string;

  displayedColumns: string[] = ['image', 'name', 'price', 'weight', 'description', 'action'];
  data!: MatTableDataSource<Product>;
  pagePerPage: any;
  pageCurrentPage: any;
  pageTotalData: any;
  imagePath!: any;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.API_URL = environment.API_URL.Local;
  };

  ngOnInit(): void {
    this.getProduct();
  };

  async getProduct() {
    let dataProduct: any = new Object();
    dataProduct.search = "";
    dataProduct.currentPage = 0;
    dataProduct.perPage = 5;
    await this.productService.getProduct(dataProduct).subscribe((res: any) => {
      this.data = res.data;
      this.pagePerPage = res.per_page;
      this.pageCurrentPage = res.current_page;
      this.pageTotalData = res.total_data;
    });
  };

  async getPageProduct(e: any) {
    this.pagePerPage = e.pageSize;
    this.pageCurrentPage = e.pageIndex;
    let dataProduct: any = new Object();
    dataProduct.search = "";
    dataProduct.currentPage = this.pageCurrentPage;
    dataProduct.perPage = this.pagePerPage;
    await this.productService.getProduct(dataProduct).subscribe((res: any) => {
      this.data = res.data;
      this.pagePerPage = res.per_page;
      this.pageCurrentPage = res.current_page;
      this.pageTotalData = res.total_data;
    });
  };

  async getSearchProduct(e: any) {
    let dataProduct: any = new Object();
    dataProduct.search = e.target.value.trim();
    dataProduct.currentPage = this.pageCurrentPage;
    dataProduct.perPage = this.pagePerPage;
    await this.productService.getProduct(dataProduct).subscribe((res: any) => {
      this.data = res.data;
      this.pagePerPage = res.per_page;
      this.pageCurrentPage = res.current_page;
      this.pageTotalData = res.total_data;
    });
  };

  manageProduct(dataProduct: any, type: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dataProduct;
    dialogConfig.minWidth = '70vh';
    dialogConfig.disableClose = true;
    switch (type) {
      case 'add':
        const dialogAdd = this.dialog.open(
          AddProductComponent,
          dialogConfig
        );
        break
      case 'edit':
        const dialogEdit = this.dialog.open(
          EditProductComponent,
          dialogConfig
        );
        break;
      case 'delete':
        const dialogDelete = this.dialog.open(
          DeleteProductComponent,
          dialogConfig
        );
        break;
      default:
        break;
    }
  }

};