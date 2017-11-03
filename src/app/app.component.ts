import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FacebookService, FacebookLoginResponse, FacebookInitParams } from 'ng2-facebook-sdk';
import { SpinnerService } from './apiServices/spinner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './apiServices/api.service';
import { NavScrollService } from './apiServices/nav-scroll.service';
declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
  // showLogout = false;
  routerLink;
  loginForm: FormGroup;
  @ViewChild('loginModal')
  loginmodal: ModalComponent;
  @ViewChild('fbModal')
  fbModal: ModalComponent;

  socialLogin;
  isEmail = false;
  modelAuth = {
    email: '',
    phoneNo: '',
    address: ''
  }
  userLogin = true;
  user: any = {
    firstName: '',
    profileImageURL: ''
  }
  promotion;
  bill: any = {
    items: [{}]
  };
  constructor(public router: Router,
    private rout: ActivatedRoute,
    private fb: FacebookService,
    private spinner: SpinnerService,
    private formBuilder: FormBuilder,
    private Api: ApiService,
    private nav: NavScrollService
  ) {

    let fbParams: FacebookInitParams = {
      appId: '739577199541612',
      xfbml: true,
      version: 'v2.8'
    };
    this.fb.init(fbParams);

    this.loginForm = formBuilder.group({
      usernameOrEmail: [null, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      password: [null, Validators.required]
    })
    if (localStorage.getItem('user') == null)
      this.userLogin = false;
    if (localStorage.getItem('user') != null)
      this.userLogin = true;

    // $('a.nav-link-scroll-to').click(function(event){
    //   event.preventDefault();
    // });
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        console.log("TREEEE", tree.fragment);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { $("html, body").animate({ scrollTop: $('#' + tree.fragment).offset().top }, "slow"); }
        }
      }
    });

  }
  Logout() {

    // this.showLogout = false;
    // document.getElementById('login').innerText = "SignIn";
    // document.getElementById('abc').innerText = "";
    // document.getElementById('login').setAttribute('class', '');
    document.getElementById('order').setAttribute('class', 'hidden');
    document.getElementById('userLogin').setAttribute('class', 'hidden');
    this.userLogin = false;
    localStorage.clear();
    // this.bill = undefined;
    this.bill = {
      items: [{}]
    };
    this.setNoOfItems();
    this.router.navigate(['/home']);
  }
  checkBill() {

    if (localStorage.getItem('bill') != undefined) {
      this.bill = JSON.parse(localStorage.getItem('bill'));
      document.getElementById('myCart').innerText = this.bill.items.length;
      if (document.getElementById('cart-list').style.display == 'none') {
        document.getElementById('cart-list').style.display = 'block';
        document.getElementById('user-details').style.display = 'none';
      }
      else if (document.getElementById('cart-list').style.display == 'block')
        document.getElementById('cart-list').style.display = 'none';
    }


  }
  menu() {
    if (document.getElementById('user-details').style.display == 'none') {
      document.getElementById('user-details').style.display = 'block';
      document.getElementById('cart-list').style.display = 'none';
    }
    else if (document.getElementById('user-details').style.display == 'block')
      document.getElementById('user-details').style.display = 'none';
  }

  route() {
    if (localStorage.getItem('cart') != undefined) {
      this.checkBill();
      this.router.navigate(['/bill']);

    }
  }
  sub: any;


  changeNavBar() {
    if (localStorage.getItem('user') != null) {
      console.log("Active");
      this.user = JSON.parse(localStorage.getItem('user'));
      document.getElementById('order').setAttribute('class', '');
      document.getElementById('userLogin').setAttribute('class', '');
      document.getElementById('displayName').innerText = this.user.firstName;
    }

  }
  Menu() {
    var menu: any = document.getElementsByClassName('inner-nav desktop-nav')[0]
    if (menu.style.display == "none")
      menu.style.display = "block";
    else
      menu.style.display = "none";
  }

  BuyNow() {
      localStorage.removeItem('obj');
      this.routerLink = '/buyNow';
      $("#usuk").hide();
      if (localStorage.getItem('user') == null)
        this.loginmodal.open();
      else if (localStorage.getItem('user') != null)
        this.router.navigate(['/buyNow']);
  }
  BuyNowuk() {

    localStorage.removeItem('obj');
    this.routerLink = '/buyNowuk';
    $("#usuk").hide();
    if (localStorage.getItem('user') == null)
      this.loginmodal.open();
    else if (localStorage.getItem('user') != null)
      this.router.navigate(['/buyNowuk']);

}
  doLogin(user) {
    this.Api.loginUser(user)
      .subscribe(
      (data) => {
        this.spinner.stop();
        console.log(data);
        let user = data;
        localStorage.setItem('user', JSON.stringify(user));
        this.loginmodal.close();
        // document.getElementById('abc').innerText= "Log Out";
        // document.getElementById('order').setAttribute('class', '');
        // document.getElementById('userLogin').setAttribute('class', '');
        // this.userLogin = true;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.router.navigate([this.routerLink]);

      },
      (error) => {
        console.log(error);
        let msg = JSON.parse(error._body);
        document.getElementById('alert').innerHTML = "<div class='alert alert-danger' role='alert'>" + msg.message + "</div>	";
        this.spinner.stop()

      },
      () => {
        console.log("Completed")
      }
      )
  }
  GoToOrders() {
    this.routerLink = '/profile/orders';
    if (localStorage.getItem('user') == null)
      this.loginmodal.open();
    else if (localStorage.getItem('user') != null)
      this.router.navigate(['/profile/orders']);
  }
  odrdropdown(){
        $("#usuk").toggle();
  }

  gotoLoginPage() {
    this.router.navigate(['/login']);
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
              username: "THO" + data.name + new Date(),
              profileImageURL: data.picture.data.url,
              DOB: data.birthday,
              gender: data.gender,
              IsSocailLogin: true
            };


            console.log("fb", data);
            this.spinner.stop();
            console.log(this.socialLogin.email)
            this.Api.loginUser(this.socialLogin)
              .subscribe(
              (data) => {
                console.log("register : ", data);
                this.spinner.stop();
                localStorage.setItem('user', JSON.stringify(data));
                this.userLogin = true;
                this.user = JSON.parse(localStorage.getItem('user'));
                // document.getElementById('order').setAttribute('class', '');
                // document.getElementById('userLogin').setAttribute('class', '');

                this.loginmodal.close();
                this.router.navigate(['/buyNow']);
              },
              (err) => {
                console.log(err);
                this.loginmodal.close();
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
        this.userLogin = true;
        this.user = JSON.parse(localStorage.getItem('user'));
        // document.getElementById('order').setAttribute('class', '');
        // document.getElementById('userLogin').setAttribute('class', '');

        this.loginmodal.close();
        this.router.navigate(['/buyNow']);
      },
      (err) => {
        console.log(err);

      }
      )

  }
  abc() {

    this.fb.getLoginStatus()
      .then(
      (response) => {
        console.log(response)
        this.fb.api('/me' + "?" + "access_token=" + response.authResponse.accessToken).then(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log(err);
          }
        )
      },
      (err) => {
        console.log(err);
      }
      )


  }
  checkRoutes(id) {
    if (this.router.url.indexOf('/home') != -1) {
      $("html, body").animate({ scrollTop: $(id).offset().top }, "slow");
    }
  }
  getPromotionBar() {
    this.Api.getPromotionBar()
      .subscribe(
      (data) => {
        console.log("Promotion :", data);
        this.promotion = data[0];
        this.spinner.stop();


      },
      (err) => {
        console.log(err);
      }
      )


  }
  Delete(item) {
    let obj = item;
    let newCart = [];
    let items = this.bill.items;
    for (let item of items) {
      if (item != obj)
        newCart.push(item);
    }
    this.bill.items = newCart;
    console.log(this.bill.items);
    let orderItems = [];
    items = this.bill.items;
    for (var i = 0; i < items.length; i++) {
      orderItems.push(items[i]);
      this.setNoOfItems();
    }
    this.Api.checkRates({ items: orderItems })
      .subscribe(
      (data) => {
        this.spinner.stop();
        console.log(data);
        this.bill.items = data.items;
        document.getElementById('myCart').innerText = this.bill.items.length;
        localStorage.setItem('bill', JSON.stringify(data));
        if (JSON.parse(localStorage.getItem('bill')).items.length == 0) {
          localStorage.removeItem('myCart');
          localStorage.removeItem('bill');
          localStorage.removeItem('obj');
        }

      },
      (err) => {
        if (err.status === 401) {
          console.log('redirect to login');
          this.spinner.stop();
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        } else {
          console.log(err.statusText);
        }
      }
      )

  }

  setNoOfItems() {
    if (localStorage.getItem('bill') != undefined) {
      let bill = JSON.parse(localStorage.getItem('bill'));
      document.getElementById('myCart').innerText = bill.items.length;
      this.bill = bill;
    }
    else
      document.getElementById('myCart').innerText = "0";

  }
  ngOnInit() {
    this.changeNavBar();
    this.getPromotionBar();
    this.setNoOfItems();
    this.route();



  }

  ngOnDestroy() {
  }
}
