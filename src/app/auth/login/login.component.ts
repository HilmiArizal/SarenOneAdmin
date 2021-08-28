import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public visibility: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.formLogin = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onChangeVisibility(){
    this.visibility = !this.visibility;
  }

  onLogin(){
    let dataLogin = this.formLogin.value;
    if(dataLogin.username === "" || dataLogin.password === "") return alert("Input correctly!")
    this.authService.login(dataLogin).subscribe((res: any) => {
      if(res.message === "User Not Found!") return alert(res.message);
      if(res.message === "Password is a wrong!") return alert(res.message);
      if(res.message === "Login Success"){
        localStorage.setItem("currentUser", JSON.stringify(res.currentUser));
        this.router.navigate(['admin']);
      }
    })
  }

}
