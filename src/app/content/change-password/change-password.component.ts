import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public formChangePassword: FormGroup;
  public visibilityOldPassword: Boolean = false;
  public visibilityNewPassword: Boolean = false;
  public visibilityNewConfirmPassword: Boolean = false;
  public user: any;


  constructor(
    private userService: UserService
  ) {
    this.formChangePassword = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newConfirmPassword: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const currentUser = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser!);
    this.user = user;
  }

  onChangeVisibilityPassword(e: any) {
    switch (e) {
      case 'op': {
        this.visibilityOldPassword = !this.visibilityOldPassword;
        break;
      }
      case 'np': {
        this.visibilityNewPassword = !this.visibilityNewPassword;
        break;
      }
      case 'cnp': {
        this.visibilityNewConfirmPassword = !this.visibilityNewConfirmPassword;
        break;
      }
    }
  }

  onChangePassword() {
    let id = this.user._id;
    let data: any = new Object();
    data.oldPassword = this.formChangePassword.value.oldPassword;
    data.newPassword = this.formChangePassword.value.newPassword;
    this.userService.changePassword(id, data).subscribe((res) => {
      console.log(res);
    })
  }

}
