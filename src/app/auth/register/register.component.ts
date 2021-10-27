import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup;

  public visibilityPassword: Boolean = false;
  public visibilityConfirmPassword: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.formRegister = new FormGroup({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onChangeVisibility(e: any) {
    switch (e) {
      case 'p':
        this.visibilityPassword = !this.visibilityPassword;
        break;
      case 'cp':
        this.visibilityConfirmPassword = !this.visibilityConfirmPassword;
        break;
    }
  }

  onRegister(formRegister: any) {
    // e.preventDefault();

    let dataRegister = this.formRegister.value;
    let newDataRegister: any = new Object();
    newDataRegister.email = dataRegister.email;
    newDataRegister.username = dataRegister.username;
    newDataRegister.password = dataRegister.password;
    if (dataRegister.password !== dataRegister.confirmPassword) return alert("Password not same!")
    this.authService.register(newDataRegister).subscribe((res) => {
      console.log(res);
      
      this.router.navigate(['/login'])
      this.formRegister.reset();
    })
  }

}
