import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavScrollService } from '../../apiServices/nav-scroll.service';
import { BrandsService } from '../../apiServices/brands.service';

@Component({
  selector: 'app-start-shopping',
  templateUrl: './start-shopping.component.html',
  styleUrls: ['./start-shopping.component.css']
})
export class StartShoppingComponent implements OnInit {
  //items :Array<String> = ["Shirts","Pants","Undergarment","Baby clother","Shoes","Hand bags","Small cosmetics","Light jacket","Puffy jacket","Makeup palatte"]
  contactForm: FormGroup;
  showNoOfItems = false;
  selectedItem;
  productDetails;
  qty: number;
  showMore;
  items;
  obj: { item: any, qty: number };
  brands;
  @ViewChild('contactUs')
  contactModal: ModalComponent;

  constructor(
    private spinner: SpinnerService,
    private Api: ApiService,
    public router: Router,
    private formBuilder: FormBuilder,
    private navScrollService: NavScrollService,
    private _brands: BrandsService
  ) {
    if (localStorage.getItem('user') != undefined) {
      document.getElementById('order').setAttribute('class', '');
      document.getElementById('userLogin').setAttribute('class', '');
    }
    let nav: any = document.getElementsByClassName('main-nav')[0];
    if (window.innerWidth < 800) {
      nav.setAttribute('class', 'main-nav dark stick-fixed mobile-on');
    }
    else {
      nav.setAttribute('class', 'main-nav dark stick-fixed');
    }
    this.getProducts();
    document.getElementById('nav').scrollIntoView();
    this.contactForm = formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      phoneNo: [null, Validators.required],
      message: [null, Validators.required],
    })


  }
  sort() {
    for (let i = 0; i < this.items.length; i++) {
      let ptr = i + 1;
      while (ptr < this.items.length) {
        if (this.items[ptr].order_number < this.items[i].order_number) {
          let temp = this.items[ptr];
          this.items[ptr] = this.items[i];
          this.items[i] = temp;
        }
        ptr++;
      }
    }
    console.log(this.items)
  }
  getProducts() {
    if (this._brands.getProducts()) {
      this.items = this._brands.getProducts();
      this.sort();
    }
    else {
      this.Api.getProducts()
        .subscribe((data) => {
          this.spinner.stop();
          console.log(data);
          this.items = data;
          this._brands.setProducts(data);
          // this.items.push({name:"Others"})
          this.sort();
        }, (err) => {
          console.log(err);
          this.onError401(err);
        }, () => {
          console.log("product api completed");
        }
        );
    }
  }

  onClick(item) {
    this.selectedItem = item.name;
    this.productDetails = item;
    this.showNoOfItems = true;

  }

  Next() {
    this.showMore = true;
  }
  EndShopping() {
    console.log(this.obj);
    console.log(this.productDetails);
    this.obj = { item: this.productDetails, qty: this.qty };
    localStorage.setItem('obj', JSON.stringify(this.obj));
    this.router.navigate(['/buyNow/shopingCart']);
  }

  ngOnInit() {
    if (localStorage.getItem('obj') != null) {
      this.obj = JSON.parse(localStorage.getItem('obj'));
    }
    this.navScrollService.setNav();

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
  closeMenu() {
    if (document.getElementById('cart-list').style.display != 'none')
      document.getElementById('cart-list').style.display = 'none';
    if (document.getElementById('user-details').style.display != 'none')
      document.getElementById('user-details').style.display = 'none';
    console.log('closeMenu')
  }

  PostMessage(obj) {

    console.log(obj);
    this.Api.postMessage(obj)
      .subscribe(
      (data) => {
        this.spinner.stop();
        console.log(data);
        document.getElementById('modal-alert').innerHTML = '<div class="alert alert-success">' + data.message + '</div>';
        this.contactForm.reset();
        setTimeout(
          () => {
            document.getElementById('modal-alert').innerHTML = '';
            this.contactModal.close();
          }, 3000)
      },
      (err) => {
        console.log(err);
        document.getElementById('modal-alert').innerHTML = '<div class="alert alert-danger">' + JSON.parse(err._body).message + '</div>'
        setTimeout(
          () => {
            document.getElementById('modal-alert').innerHTML = '';
          }, 3000)
      }
      )
  }

}
