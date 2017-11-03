import { Component, OnInit, ViewChild } from '@angular/core';

import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  @ViewChild('loginModal')
  loginmodal: ModalComponent;
  @ViewChild('AddressModal')
  addressModal: ModalComponent;
  @ViewChild('modal')
  Modal: ModalComponent;
  @ViewChild('AddModal')
  AddModal: ModalComponent;
  @ViewChild('checkoutModal')
  CheckoutModal: ModalComponent;
  AddressForm: FormGroup;
  PromoForm: FormGroup;
  complexForm;
  checkBox: FormGroup;
  editingAddress = false;
  editingInfo = false;
  image;
  constructor(
    public router: Router,
    private spinner: SpinnerService,
    private Api: ApiService,
    private formBuilder: FormBuilder,
    private navScrollService: NavScrollService
  ) {
    console.log(this.items)
    let nav: any = document.getElementsByClassName('main-nav')[0];
    this.setBill();
    // this.updateBill();
    this.AddressForm = formBuilder.group({
      Address: [null, Validators.required]
    })
    this.PromoForm = formBuilder.group({
      promo: [null, [Validators.required,Validators.maxLength(10),Validators.minLength(4)]]
    })
    if (localStorage.getItem('user') != undefined) {
      document.getElementById('order').setAttribute('class', '');
      document.getElementById('userLogin').setAttribute('class', '');
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    document.getElementById('nav').scrollIntoView();
    if (localStorage.getItem('user') != null)
      this.user = JSON.parse(localStorage.getItem('user'));
    this.complexForm = formBuilder.group({
      first_Name: [this.user.firstName, Validators.required],
      last_Name: [this.user.lastName, Validators.required],
      username: [this.user.displayName, Validators.required],
      Email: [this.user.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      PhoneNo: [this.user.phone, Validators.required],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      country: [this.user.country, Validators.required]
    })
    this.checkBox = formBuilder.group({
      value: [null, Validators.required]
    })

  }
  user;
  bill;
  items;
  promoMsg;
  promoRedeem = false;
  Address;
  showForm = false;
  sub: any;
  showBill = (localStorage.getItem('bill') != undefined) ? true : false;
  showDetail = false;
  showGreet = (localStorage.getItem('bill') == undefined) ? true : false;
  order;
  setBill() {
    this.bill = JSON.parse(localStorage.getItem('bill'));
    console.log("bill");
    console.log(this.bill);
    this.items = this.bill.items;
    this.setNoOfItems();
    localStorage.removeItem('cart');




  }
  btnValue;
  Checkout() {
    localStorage.removeItem('bill');
    localStorage.removeItem('myCart');
    localStorage.removeItem('obj');
    localStorage.removeItem('brand');
    setTimeout(
      () => {
        this.router.navigate(['/home']);
      }, 1000
    )




  }
  itemsLength;
  OpenModal() {
    this.itemsLength = JSON.parse(localStorage.getItem('bill')).items.length;
    if (this.router.url == '/bill')
      this.AddModal.open();
  }
  Delete(item) {
    let obj = item;
    let newCart = [];
    for (let item of this.items) {
      if (item != obj)
        newCart.push(item);
    }
    this.items = newCart;
    let myCart = JSON.parse(localStorage.getItem('myCart'));
    newCart = [];
    for (let c of myCart) {
      let items = [];
      for (let CartItem of c.items) {
        if (CartItem.Price == item.price && CartItem.info == item.additional_info && CartItem.product_id == item.product_id && item.url == CartItem.url) {
        }
        else{
          items.push(CartItem);
        }
      }
      if (items.length > 0) {
        newCart.push({ name: c.name, items: items });
      }

    }
    localStorage.setItem("myCart", JSON.stringify(newCart));
    this.updateBill();

  }
  updateBill() {
    let orderItems = [];
    let obj = { items: this.items }
    console.log(obj);
    this.Api.checkRatesuk(obj)
      .subscribe(
      (data) => {
        this.spinner.stop();
        console.log(data);
        localStorage.setItem('bill', JSON.stringify(data));
        this.btnValue = undefined;
        if (data.discountMessage != undefined) {
          this.promoMsg = data.discountMessage;
        }
        this.setBill();
      },
      (err) => {
        console.log(err);
        this.onError401(err);
      }
      )



  }
  postOrder() {
    if (localStorage.getItem('user') != null) {
      let user = JSON.parse(localStorage.getItem('user'));
      let order = {
        user_id: user._id,
        email: user.email,
        items: this.items,
        address: user.address,
        city: user.city,
        country: user.country,
        contact_me_if_no_items: (this.checkBox.value.value == "Contact me") ? true : false,
        purchase_whatever_available: (this.checkBox.value.value == "Purchase whatever is available") ? true : false

      }
      console.log(order);

      this.Api.postOrder(order)
        .subscribe(
        (data) => {
          this.spinner.stop();
          console.log(data);
          this.order = data;
          this.showBill = false;
          this.showDetail = false;
          this.showGreet = true;
          localStorage.setItem('bill', JSON.stringify(data));
          localStorage.removeItem('bill');
          localStorage.removeItem('myCart');
          localStorage.removeItem('obj');
          localStorage.removeItem('brand');
          document.getElementById('myCart').innerText = "0";
        },
        (err) => {
          console.log(err);
          this.onError401(err);
        }
        )
    }
    if (localStorage.getItem('user') == null) {
      this.loginmodal.open();
    }


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
        document.getElementById('login').setAttribute('class', 'hidden');

        document.getElementById('abc').innerText = "Log Out";
        this.postOrder();

      },
      (error) => {
        console.log(error);
        let msg = JSON.parse(error._body);
        document.getElementById('alert').innerHTML = "<div class='alert alert-danger' role='alert'>" + msg.message + "</div>	";
        this.onError401(error);

      },
      () => {
        console.log("Completed")
      }
      )
  }
  RedeemPromo(promoForm) {
    console.log("promoCode", promoForm.promo)
    this.Api.checkPromo({ code: promoForm.promo })
      .subscribe(
      (data) => {
        this.spinner.stop();
        console.log(data);
        this.promoMsg = data.message;
        this.promoRedeem = true;
        this.updateBill();
      },
      (err) => {
        console.log(err);
        this.spinner.stop()
        this.promoMsg = JSON.parse(err._body).message;
        document.getElementById('promo').innerHTML = '<div class="alert error" style="width: 100%;text-align: center"><i class="fa fa-lg fa-check-circle-o"></i> ' + this.promoMsg + '</div>';
        setTimeout(()=>{
            document.getElementById('promo').innerHTML = '';
        },3000);
        this.onError401(err);
      }
      )
  }
  onError401(err) {
    if (err.status === 401) {
      this.spinner.stop();
      console.log('redirect to login');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } else {
      console.log(err.statusText);
    }
  }
  setNoOfItems() {
    if (localStorage.getItem('bill') != undefined) {
      let bill = JSON.parse(localStorage.getItem('bill'));
      document.getElementById('myCart').innerText = bill.items.length;
      this.bill = bill;
    }

  }
  closeMenu() {
    if (document.getElementById('cart-list').style.display != 'none')
      document.getElementById('cart-list').style.display = 'none';
    if (document.getElementById('user-details').style.display != 'none')
      document.getElementById('user-details').style.display = 'none';
    console.log('closeMenu')
  }
  editProfile(newProfile) {
    console.log(newProfile);
    let obj = {
      _id: this.user._id,
      firstName: newProfile.first_Name,
      lastName: newProfile.last_Name,
      email: newProfile.Email,
      username: newProfile.username,
      dob: newProfile.Date,
      phone: newProfile.PhoneNo,
      address: newProfile.address,
      city: newProfile.city,
      country: newProfile.country,
    }
    this.Api.editUser(obj)
      .subscribe(
      (data) => {
        console.log(data);
        this.spinner.stop();
        this.user = data;
        localStorage.setItem('user', JSON.stringify(data));

      },
      (err) => {
        console.log(err);
        this.spinner.stop();

      }
      )
  }
  DeletePromo() {
    this.Api.deletePromo()
      .subscribe(
      (data) => {
        console.log(data);
        this.updateBill();
      },
      (err) => {
        console.log(err);
      }
      )
  }
  showCart() {
    this.showBill = true;
    this.showDetail = false;
  }
  showDetails() {
    this.showBill = false;
    this.showDetail = true;
  }
  ngOnInit() {
    // localStorage.removeItem('myCart');
    this.navScrollService.setNav();
  }

}
