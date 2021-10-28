import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AddStoreComponent } from 'src/app/component/dialog/store/add-store/add-store.component';
import { DeleteStoreComponent } from 'src/app/component/dialog/store/delete-store/delete-store.component';
import { EditStoreComponent } from 'src/app/component/dialog/store/edit-store/edit-store.component';
import { Store } from 'src/app/interface/store';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  displayedColumns: string[] = ['name', 'action'];
  data!: MatTableDataSource<Store>;
  pagePerPage: any;
  pageCurrentPage: any;
  pageTotalData: any;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getStore();
  }

  async getStore(){
    let dataStore: any = new Object();
    dataStore.search = "";
    dataStore.currentPage = 0;
    dataStore.perPage = 3;
    await this.storeService.getStore(dataStore).subscribe((res: any) => {
      this.data = res.data;
      this.pagePerPage = res.per_page;
      this.pageCurrentPage = res.current_page;
      this.pageTotalData = res.total_data;
    });
  }

  async getSearchStore(e: any) {
    let dataStore: any = new Object();
    dataStore.search = e.target.value.trim();
    dataStore.currentPage = this.pageCurrentPage;
    dataStore.perPage = this.pagePerPage;
    await this.storeService.getStore(dataStore).subscribe((res: any) => {
      this.data = res.data;
      this.pagePerPage = res.per_page;
      this.pageCurrentPage = res.current_page;
      this.pageTotalData = res.total_data;
    });
  }

  async getPageStore(e: any) {
    this.pagePerPage = e.pageSize;
    this.pageCurrentPage = e.pageIndex;
    let dataStore: any = new Object();
    dataStore.search = "";
    dataStore.currentPage = this.pageCurrentPage;
    dataStore.perPage = this.pagePerPage;
    await this.storeService.getStore(dataStore).subscribe((res: any) => {
      this.data = res.data;
      this.pagePerPage = res.per_page;
      this.pageCurrentPage = res.current_page;
      this.pageTotalData = res.total_data;
    });
  }

  manageStore(dataStore: any, type: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dataStore;
    dialogConfig.disableClose = true;
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = 5000;
    snackBarConfig.panelClass = ['red-snackbar']
    switch (type) {
      case 'add':
        dialogConfig.minWidth = "50vw";
        const dialogAdd = this.dialog.open(
          AddStoreComponent,
          dialogConfig
        );
        dialogAdd.afterClosed().subscribe((results) => {
          if (results) {
            this.storeService.addStore(results).subscribe((res: any) => {
              if (res['message'] === "Add Data Successful") {
                this.snackBar.open("New Store Has Been Added", "", snackBarConfig);
                this.getStore();
              }
            })
          }
        })
        break
      case 'edit':
        dialogConfig.minWidth = "50vw";
        const dialogEdit = this.dialog.open(
          EditStoreComponent,
          dialogConfig
        );
        dialogEdit.afterClosed().subscribe((results) => {
          if(results){
            this.storeService.editStore(results).subscribe((res: any) => {
              this.snackBar.open("Store Has Been Updated", "", snackBarConfig);
              this.getStore();
            })
          }
        })
        break;
      case 'delete':
        dialogConfig.minWidth = "30vw";
        const dialogDelete = this.dialog.open(
          DeleteStoreComponent,
          dialogConfig
        );
        dialogDelete.afterClosed().subscribe((results) => {
          if (results) {
            this.storeService.deleteStore(results).subscribe((res: any) => {
              if (res['message'] === "Delete Data Successful") {
                this.getStore();
                this.snackBar.open("Store Has Been Deleted", "", snackBarConfig);
              }
            })
          }
        })
        break;
      default:
        break;
    }
  }
}
