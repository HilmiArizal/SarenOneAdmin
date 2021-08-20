import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private productService: ProductService) {
    this.API_URL = environment.API_URL.Local;
  };

  ngOnInit(): void {
    this.getProduct();
  };

  async getProduct() {
    let dataProduct: any = new Object();
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
    dataProduct.currentPage = this.pageCurrentPage;
    dataProduct.perPage = this.pagePerPage;
    await this.productService.getProduct(dataProduct).subscribe((res: any) => {
      this.data = res.data;
      this.pagePerPage = res.per_page;
      this.pageCurrentPage = res.current_page;
      this.pageTotalData = res.total_data;
    });
  };
};