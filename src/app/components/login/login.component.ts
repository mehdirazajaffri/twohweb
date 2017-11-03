import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { UserApi } from '../../services/custom/User';
import { AuthService } from '../../apiServices/auth.service';

import { FacebookService, FacebookLoginResponse, FacebookInitParams } from 'ng2-facebook-sdk';

import { HomeComponent } from '../home/home.component';
import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  complexForm: FormGroup;
  complexForm2: FormGroup;
  socialLogin;
  @ViewChild('fbModal')
  fbModal: ModalComponent;
  isEmail = false;
  modelAuth = {
    email: '',
    phoneNo: '',
    address: ''
  }
  showLogin = true;
  constructor(
    private userApi: UserApi,
    private authService: AuthService,
    public router: Router,
    private fb: FacebookService,
    formBuilder: FormBuilder,
    private spinner: SpinnerService,
    private Api: ApiService,
    private navScrollService: NavScrollService
  ) {
    document.getElementById('nav').scrollIntoView();
    this.complexForm = formBuilder.group({
      first_Name: [null, Validators.required],
      last_Name: [null, Validators.required],
      Email: [null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      PhoneNo: [null, Validators.pattern("[0-9.() +-]*")],
      Password: [null, Validators.required],
      checked: [false, Validators.pattern("true")]
    })
    this.complexForm2 = formBuilder.group({
      usernameOrEmail: [null, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      password: [null, Validators.required]
    })
      ;
    let fbParams: FacebookInitParams = {
      appId: '275765582915286',
      xfbml: true,
      version: 'v2.8'
    };
    this.fb.init(fbParams);
  }

  Register(forms) {
    let a: HTMLScriptElement = <HTMLScriptElement>document.getElementById('gender').getElementsByClassName('nav-link active')[0]
    let Gender = a.innerText;
    let obj = {
      firstName: forms.first_Name,
      lastName: forms.last_Name,
      displayName: forms.first_Name + forms.last_Name,
      email: forms.Email,
      username: "THO" + forms.first_Name.toLowerCase() + forms.last_Name.toLowerCase() + new Date(),
      password: forms.Password,
      profileImageURL: "http://lorempixel.com/400/200/people/",
      DOB: forms.Date,
      phone: forms.PhoneNo,
      gender: Gender,
      address: forms.Address
    }
    console.log(obj);
    this.Api.createUser(obj)
      .subscribe((res) => {
        console.log(res);
        this.spinner.stop();
        document.getElementById('alert').innerHTML = "<div class='alert alert-success' role='alert'>" + res.message + "</div>	";
        setTimeout(() => {
          document.getElementById('alert').innerHTML = "";
          this.router.navigate(['/home']);
        }, 3000)
      }, (err) => {
        console.log(err);
        let msg = JSON.parse(err._body);
        document.getElementById('alert').innerHTML = "<div class='alert alert-danger' role='alert'>" + msg.message + "!</div>	";
        setTimeout(() => {
          document.getElementById('alert').innerHTML = "";
        }, 3000)
        this.spinner.stop();
      })

  }

  ngOnInit() {
      this.navScrollService.setNav();
  }
  doLogin(user) {

    this.Api.loginUser(user)
      .subscribe(
      (data) => {
        console.log(data);
        let user = data;
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home', user]);
      },
      (error) => {
        console.log(error);
        let msg = JSON.parse(error._body);
        document.getElementById('alert').innerHTML = "<div class='alert alert-danger' role='alert'>" + msg.message + "</div>	";
        setTimeout(() => {
          document.getElementById('alert').innerHTML = "";
        }, 3000)
        this.spinner.stop()

      },
      () => {
        console.log("Completed")
      }
      )
  }
  fbLogin() {
    this.fb.login().then(
      (response: FacebookLoginResponse) => {
        console.log(response);
        this.spinner.stop();
        this.fb.api('/me' + "?" + "access_token=" + response.authResponse.accessToken + "&fields=id,name,email,picture,first_name,last_name,birthday,gender")
          .then(
          (data) => {
            this.spinner.stop();
            if (data.email == undefined)
              this.isEmail = true;

            this.socialLogin = {
              id: data.id,
              email: data.email,
              first_name: data.first_name,
              last_name: data.last_name,
              displayName: data.name,
              username: "THO" + data.email,
              profileImageURL: data.picture.data.url,
              DOB: data.birthday,
              gender: data.gender,
              IsSocailLogin: true
            };


            console.log("fb", data);
            this.spinner.stop();
            this.Api.loginUser(this.socialLogin)
              .subscribe(
              (data) => {
                console.log("register : ", data);
                this.spinner.stop();
                localStorage.setItem('user', JSON.stringify(data));
                // document.getElementById('login').innerText="";
                document.getElementById('login').setAttribute('class', 'hidden');
                document.getElementById('displayName').innerText = data.firstName;
                document.getElementById('order').setAttribute('class', '');
                document.getElementById('userLogin').setAttribute('class', '');
                this.router.navigate(['/home'], data);
              },
              (err) => {
                console.log(err);
                // this.fbModal.open();
                this.spinner.stop()
              }
              )

          },
          (err) => {
            console.log(err);
          }
          )
      },
      (error: any) => console.error(error)
    );
  }

  SocialSignUp(email, phone) {
    console.log(email);
    console.log(phone);
    if (email != "")
      this.socialLogin.email = email;
    this.socialLogin.phone = phone;
    console.log("SocialLogin : ", this.socialLogin)
    this.fbModal.close();

    this.Api.loginUser(this.socialLogin)
      .subscribe(
      (data) => {
        console.log("register : ", data);
        this.spinner.stop();
        localStorage.setItem('user', JSON.stringify(data));
        document.getElementById('login').setAttribute('class', 'hidden');
        document.getElementById('abc').innerText = "Log Out";
        document.getElementById('order').setAttribute('class', '');
        document.getElementById('userLogin').setAttribute('class', '');
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
      }
      )

  }
  LoginShow() {
    this.showLogin = true;
    document.getElementById('login-li').setAttribute('class', 'active');
    document.getElementById('registration-li').setAttribute('class', '');

  }
  showRegistration() {
    this.showLogin = false;
    document.getElementById('login-li').setAttribute('class', '');
    document.getElementById('registration-li').setAttribute('class', 'active');
  }
  closeMenu() {
    if (document.getElementById('cart-list').style.display != 'none')
      document.getElementById('cart-list').style.display = 'none';
    if (document.getElementById('user-details').style.display != 'none')
      document.getElementById('user-details').style.display = 'none';
    console.log('closeMenu')
  }
  forgotPassword(Email) {
    let obj = { email: Email }
    console.log(obj);
    this.Api.forgotPassword(obj)
      .subscribe(
      (data) => {
        console.log(data);
        this.spinner.stop();
        document.getElementById('alert').innerHTML = "<div class='alert alert-success' role='alert'>" + data.message + "</div>	";
        setTimeout(() => {
          document.getElementById('alert').innerHTML = "";
        }, 3000)
      },
      (err) => {
        console.log(err)
        this.spinner.stop()
        let msg = JSON.parse(err._body);
        document.getElementById('alert').innerHTML = "<div class='alert alert-danger' role='alert'>" + msg.message + "</div>	";
        setTimeout(() => {
          document.getElementById('alert').innerHTML = "";
        }, 3000)
      }
      )
  }


}
