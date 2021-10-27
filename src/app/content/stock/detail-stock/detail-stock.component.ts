import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail-stock',
  templateUrl: './detail-stock.component.html',
  styleUrls: ['./detail-stock.component.scss']
})
export class DetailStockComponent implements OnInit {

  displayedColumns: string[] = ['name', 'stock', 'weight'];
  data!: MatTableDataSource<Product>;
  pagePerPage: any;
  pageCurrentPage: any;
  pageTotalData: any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  async getProduct() {
    let dataProduct: any = new Object();
    dataProduct.search = "";
    dataProduct.currentPage = 0;
    dataProduct.perPage = 0;
    await this.productService.getProduct(dataProduct).subscribe((res: any) => {
      this.data = res.data;
      this.pagePerPage = res.per_page;
      this.pageCurrentPage = res.current_page;
      this.pageTotalData = res.total_data;
    })
  }
  
}
