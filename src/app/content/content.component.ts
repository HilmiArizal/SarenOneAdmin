import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public API_URL: string;
  public user: any;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.API_URL = environment.API_URL.Local;
    this.dataSource.data = TREE_DATA;

  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      route: node.route,
      level: level,
    };
  }

  ngOnInit(): void {
    this.getUser();
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  getUser() {
    const currentUser = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser!);
    this.user = user;
  }

  stockNavigate(router: any) {
    switch (router) {
      case 'first-stock':
        this.router.navigate(['/admin/stock/first-stock']);
        break;
      case 'add-stock':
        this.router.navigate(['/admin/stock/add-stock']);
        break;
      case 'sales':
        this.router.navigate(['/admin/stock/sales']);
        break;
      case 'last-stock':
        this.router.navigate(['/admin/stock/last-stock']);
        break;
      case 'detail-stock':
        this.router.navigate(['/admin/stock/detail-stock']);
        break;
      default:
        break;
    }
  }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}

interface FoodNode {
  name: string;
  route?: string;
  children?: FoodNode[];
};

const TREE_DATA: FoodNode[] = [
  {
    name: 'Stock Product',
    children: [
      { name: 'Stok Awal', route: 'first-stock' },
      { name: 'Tambah Stok', route: 'add-stock' },
      { name: 'Penjualan', route: 'sales' },
      { name: 'Stok Akhir', route: 'last-stock' },
      { name: 'Detail Stok', route: 'detail-stock' },
    ]
  }
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  route: any;
  level: number;
}
