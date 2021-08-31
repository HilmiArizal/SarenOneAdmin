import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
    this.API_URL = environment.API_URL.Server;
  }

  ngOnInit(): void {
    this.getUser();
  }

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

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
