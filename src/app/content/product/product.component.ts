import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductComponent } from 'src/app/component/dialog/product/add-product/add-product.component';
import { DeleteProductComponent } from 'src/app/component/dialog/product/delete-product/delete-product.component';
import { EditProductComponent } from 'src/app/component/dialog/product/edit-product/edit-product.component';
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
  imagePath: any;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.API_URL = environment.API_URL.Server;
  };

  ngOnInit(): void {
    this.getProduct();
  };

  async getProduct() {
    let dataProduct: any = new Object();
    dataProduct.search = "";
    dataProduct.currentPage = 0;
    dataProduct.perPage = 3;
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
    dialogConfig.disableClose = true;
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = 5000;
    snackBarConfig.panelClass = ['red-snackbar']
    switch (type) {
      case 'add':
        dialogConfig.minWidth = "50vw";
        const dialogAdd = this.dialog.open(
          AddProductComponent,
          dialogConfig
        );
        dialogAdd.afterClosed().subscribe((results) => {
          if (results.data) {
            this.productService.addProduct(results).subscribe((res: any) => {
              if (res['message'] === "Add Data Successful") {
                this.getProduct();
                this.snackBar.open("New Product Has Been Added", "", snackBarConfig);
              }
            })
          }
        })
        break
      case 'edit':
        dialogConfig.minWidth = "50vw";
        const dialogEdit = this.dialog.open(
          EditProductComponent,
          dialogConfig
        );
        dialogEdit.afterClosed().subscribe((results) => {
          if(results){
            this.productService.editProduct(results).subscribe((res: any) => {
              this.getProduct();
              this.snackBar.open("Product Has Been Updated", "", snackBarConfig);
            })
          }
        })
        break;
      case 'delete':
        dialogConfig.minWidth = "30vw";
        const dialogDelete = this.dialog.open(
          DeleteProductComponent,
          dialogConfig
        );
        dialogDelete.afterClosed().subscribe((results) => {
          if (results) {
            this.productService.deleteProduct(results).subscribe((res: any) => {
              if (res['message'] === "Delete Data Successful") {
                this.getProduct();
                this.snackBar.open("Product Has Been Deleted", "", snackBarConfig);
              }
            })
          }
        })
        break;
      default:
        break;
    }
  }

};