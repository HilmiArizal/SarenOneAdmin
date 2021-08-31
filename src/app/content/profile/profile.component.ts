import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public formProfile: FormGroup;
  public formProfileOld: any;
  public API_URL: string;
  public user: any;
  public image: any;
  public previewImage: any;
  public changeImage: boolean = false;

  public phonenumber: any;
  public nickname: any;
  public division: any;

  constructor(
    private userService: UserService
  ) {
    this.API_URL = environment.API_URL.Server;
    this.formProfile = new FormGroup({
      phonenumber: new FormControl('', Validators.required),
      nickname: new FormControl('', Validators.required),
      division: new FormControl('', Validators.required),
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

  onChangeImage(e: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.changeImage = true;
      this.previewImage = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
    this.image = e.target.files[0];
  }

  onChangePhoneNumber(e: any) {
    this.phonenumber = e.target.value;
  }

  onChangeNickname(e: any) {
    this.nickname = e.target.value;
  }

  onChangeDivision(e: any) {
    this.division = e.target.value;
  }

  onRemoveImage() {
    this.changeImage = false;
  }

  onChangeProfile() {
    let id = this.user._id;
    let data = this.formProfile.value;
    let img = this.image;
    if (!data.phonenumber || !data.nickname || !data.division) {
      let phonenumber = this.phonenumber ? parseInt(this.phonenumber) : this.user.phonenumber;
      let nickname = this.nickname ? this.nickname : this.user.nickname;
      let division = this.division ? this.division : this.user.division;
      let dataProfile = { phonenumber, nickname, division };
      this.userService.changeProfile(id, dataProfile, img).subscribe((res: any) => {
        if (res.message === "Update Data Successful") {
          localStorage.setItem("currentUser", JSON.stringify(res.currentUser))
          window.location.reload();
        }
      })
    } else {
      this.userService.changeProfile(id, data, img).subscribe((res: any) => {
        if (res.message === "Update Data Successful") {
          localStorage.setItem("currentUser", JSON.stringify(res.currentUser))
          window.location.reload();
        }
      })
    }
  }

}
