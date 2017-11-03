import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

import {Http,Headers} from '@angular/http';
import { Observable } from 'rxjs';
declare var $ : any;
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  title = 'Almost done';
  @ViewChild('loginModal')
  loginmodal: ModalComponent;
  isUnValide: boolean = false;
  Items;
  @ViewChild('AddvertiseModal')
  AddsModal: ModalComponent;
  @ViewChild('Contactmodal')
  contactModal: ModalComponent;
  specialOffer: Number;
  contactForm;
  Brands2;
  brandsrow1;
  brandsrow2;
  brandsrow3;
  public data_servers;
  constructor(
    private spinner: SpinnerService,
    public router: Router,
    private Api: ApiService,
    private navScrollService: NavScrollService,
    private http: Http
  ) {
    this.http = http; 
    this.getBrands2()
    if (localStorage.getItem('user') != undefined) {
      document.getElementById('order').setAttribute('class', '');
      document.getElementById('userLogin').setAttribute('class', '');
    }
    if (localStorage.getItem('obj') != null) {
      this.obj = JSON.parse(localStorage.getItem('obj'));
      console.log(this.obj)
    }
    this.getBrands();
    this.contactForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)),
      phoneNo: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
    })

  }
  obj: {
    item: any,
    qty: number
  };
  newObj: Array<{
    name: any,
    items: any
  }> = [];
  Brands;
  oldCart;
  print() {
    let start = 0;
    if (localStorage.getItem('myCart') != undefined) {
      this.newObj = JSON.parse(localStorage.getItem('myCart'));
      start = this.newObj.length;
      for (let a in this.newObj) {
        for (let i in this.newObj[a].items) {
          this.newObj[a].items[i].isInvalid = false;
        }
      }
    }
    let matchFound = false;
    if (this.obj) {
      for (let i in this.newObj) {
        if (this.isEquivalent(this.newObj[i].name, this.obj.item)) {
          this.newObj[i].items.push({
            name: this.obj.item.name,
            url: "",
            info: "",
            Price: undefined,
            image: "",
            quantity: 1,
            isInvalid: false,
            product_id: this.obj.item._id
          })
          matchFound = true;
        }
      }
      if (!matchFound) {
        this.newObj.push({
          name: this.obj.item,
          items: []
        })
        for (var i = 0; i < this.obj.qty; i++) {
          this.newObj[start].items.push({
            name: this.obj.item.name,
            url: "",
            info: "",
            Price: undefined,
            image: "",
            quantity: 1,
            isInvalid: false,
            product_id: this.obj.item._id
          })

        }
      }
    }
    start++;
    localStorage.removeItem('obj');
    console.log("this.newObj", this.newObj);
  }

  setToLocalStorage() {
    let name = 20;
    localStorage.setItem("myCart", JSON.stringify(this.newObj));
  }
  Delete(item) {
    let obj = item;
    let newCart = [];
    for (let c of this.newObj) {
      // let newObj = { name: c.name, items: [] };
      let items = [];
      for (let item of c.items) {
        if (item != obj)
          items.push(item);
      }
      if (items.length > 0) {
        newCart.push({ name: c.name, items: items });
      }

    }
    this.newObj = newCart;
    localStorage.setItem("myCart", JSON.stringify(newCart));
  }
  isEquivalent(a, b) {
    //to check equality of two Objects
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
      return false;
    }
    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }

  @Output() shopAgain = new EventEmitter;
  ShopAgain() {
    this.shopAgain.emit({ value: false });
  }
  @Output() bill = new EventEmitter;
  ShowBill() {
    this.bill.emit({ value: true });
    this.postOrder();
  }
  postOrder() {
    let findBrand = true;
    let orderItems = [];
    // if (localStorage.getItem('bill')) {
    //   let bill = JSON.parse(localStorage.getItem('bill'));
    //   orderItems = bill.items;
    // }
    let noPrice = false; //check for price
    for (let a in this.newObj) {
      let objitems = this.newObj[a].items;
      for (var i = 0; i < objitems.length; i++) {
        // let w = objitems[i].url.indexOf('//');
        // let a = objitems[i].url.indexOf('.com');
        // let b = objitems[i].url.indexOf('/',a);
        // let brandUrl = objitems[i].url.substring(w+2,b);
        let brandUrl = objitems[i].url;
        let brand;
        for (let Brand of this.Brands) {
          let w = Brand.url.indexOf('//');
          let a = Brand.url.indexOf('.com');
          let b = Brand.url.indexOf('/', a);
          // let url = Brand.url.substring(w+2,b);
          let url = Brand.url.substring(Brand.url.indexOf('.') + 1);
          if (brandUrl.indexOf(url) > 0) {
            brand = Brand;

          }
        }

        console.log(brand);
        if (brand == undefined)
          findBrand = false;
        // if(localStorage.getItem('bill') != undefined)
        //   orderItems = JSON.parse(localStorage.getItem('bill')).items;
        orderItems.push({
          url: objitems[i].url,
          additional_info: objitems[i].info,
          price: objitems[i].Price,
          image: objitems[i].image,
          quantity: objitems[i].quantity,
          product_id: objitems[i].product_id,
          brand_id: (brand != undefined) ? brand._id : '',
          brand_name: (brand != undefined) ? brand.name : '',
          brands: (brand != undefined) ? brand : '',
          isInvalid: (brand == undefined || objitems[i].Price == undefined) ? true : false

        })
        if (objitems[i].Price == undefined) {
          noPrice = true;
        }

      }
    }
    let obj = { items: orderItems }

    console.log(obj);
    if (findBrand && !noPrice) {
      this.isUnValide = false;
      this.Api.checkRates(obj)
        .subscribe(
        (data) => {
          this.spinner.stop();
          console.log(data);
          localStorage.setItem('bill', JSON.stringify(data));
          this.specialOffer = data.special_offer.amount;
          // this.AddsModal.open();
          this.router.navigate(['/bill']);
        },
        (err) => {
          console.log(err);
          this.onError401(err);
          if (err.status == 400) {
            this.isUnValide = true;
            let items = JSON.parse(err._body).items;
            console.log("items", items);
            console.log(this.newObj);
            let i = 0;
            for (let obj of this.newObj) {
              for (let item of obj.items) {
                if (items[i].isInvalid == true)
                  item.isInvalid = items[i].isInvalid;
                else
                  item.isInvalid = false;
                i++;
              }
            }
            console.log("newObj", this.newObj);

          }
          this.spinner.stop()
        }
        )
    }
    else {
      console.log(orderItems)
      let j = 0;
      for (let obj of this.newObj) {
        for (let item of obj.items) {
          if (orderItems[j].isInvalid == true)
            item.isInvalid = true;
          else
            item.isInvalid = false;
          j++;
        }
      }
      console.log(this.newObj);
      this.isUnValide = true;
    }

  }
  scrapper(){
      // var data = {
      //   url :$("#img").val()
      // }
      // this.Api.scrap(data)
      // .subscribe(
      //   (data)=>{
      //     $("#price").val(data.price.replace(/[^\d.-]/g, ''))
      //     $("#info").val(data.color)
      //     $("#image").val(data.img)
      //     this.spinner.stop();
      //   },
      //   (err)=>{
      //     console.log(err);
      //   }
      // )
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
        document.getElementById('login').innerText = "";

        document.getElementById('abc').innerText = "Log Out";
        // this.postOrder();

      },
      (error) => {
        console.log(error);
        document.getElementById('alert').innerHTML = "<div class='alert alert-danger' role='alert'>Login Failed!</div>	";

      },
      () => {
        console.log("Completed")
      }
      )
  }
  onError401(err) {
    if (err.status === 401) {
      this.spinner.stop();
      console.log('redirect to login');
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } else {
      console.log(err.statusText);
    }
  }
  getBrands() {
    this.Api.getBrands()
      .subscribe(
      (data) => {
        console.log(data);
        this.Brands = data;
        this.spinner.stop();
      },
      (err) => {
        console.log(err);
      }
      )

  }
  getBrands2() {
    this.Api.getBrands()
      .subscribe(
      (data) => {
        console.log(data);
        this.Brands2 = data;
        this.brandsrow1 = this.Brands2.splice(0,11);
        this.brandsrow2 = this.Brands2.splice(0,11);
        this.brandsrow3 = this.Brands2.splice(0,11);
        setTimeout(
          ()=>{
            $(".sidebar_slider").slick({
                arrows: true,
                infinite: true,
                slidesToShow: 1,
                autoplay: true,
                speed: 500
            });
          },1000)

        this.spinner.stop();
      },
      (err) => {
        console.log(err);
      }
      )

  }
  closeMenu() {
    if (document.getElementById('cart-list').style.display != 'none')
      document.getElementById('cart-list').style.display = 'none';
    if (document.getElementById('user-details').style.display != 'none')
      document.getElementById('user-details').style.display = 'none';
    console.log('closeMenu')
  }
  addItem() {
    this.newObj[0].items.push({
      name: this.obj[0].item.name,
      url: "",
      info: "",
      Price: undefined,
      image: "",
      quantity: 1,
      isInvalid: false,
      product_id: this.obj[0].item._id
    })
  }
  gotoBill() {
    setTimeout(
      () => {
        this.router.navigate(['/bill']);
      }, 1000
    )

  }
  closeModal() {
    this.AddsModal.close();
    let length = JSON.parse(localStorage.getItem("myCart")).length;
    for (let i = 0; i < length; i++) {
      if (document.getElementsByClassName("show")[0] != undefined)
        document.getElementsByClassName("show")[0].setAttribute('class', '');
    }


  }
  addProduct(i) {
    if (this.newObj[i].items.length < 25) {
      this.newObj[i].items.push({
        name: this.newObj[i].name.name,
        url: "",
        info: "",
        Price: undefined,
        image: "",
        quantity: 1,
        isInvalid: false,
        product_id: this.newObj[i].name._id
      })
    }
    else {
      document.getElementById('alert').innerHTML = `<div class="alert error">
                You can only add 25 Items
            </div>`;
      document.getElementById('page').scrollIntoView();
      setTimeout(() => { document.getElementById('alert').innerHTML = ''; }, 3000)
    }

  }
  PostMessage(obj) {

    console.log(obj);
    this.Api.postMessage(obj)
      .subscribe(
      (data) => {
        this.spinner.stop();
        console.log(data);
        document.getElementById('alert-modal-contact').innerHTML = '<div class="alert alert-success">'+data.message+'</div>';
        this.contactForm.reset();
        setTimeout(
            ()=>{
              document.getElementById('alert-modal-contact').innerHTML = '';
              this.contactModal.close();
            },3000)
      },
      (err) => {
        console.log(err);
        document.getElementById('alert-modal-contact').innerHTML = '<div class="alert alert-danger">'+JSON.parse(err._body).message+'</div>'
        setTimeout(
            ()=>{
              document.getElementById('alert-modal-contact').innerHTML = '';
            },3000)
      }
      )
  }
  ngOnInit() {
    this.print();
    this.navScrollService.setNav();


  }


}
