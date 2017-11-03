import { Component, OnInit } from '@angular/core';

import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private spinner: SpinnerService,
    private Api: ApiService,
    private router: Router,
    private navScrollService: NavScrollService
  ) {
    if (localStorage.getItem('user') != undefined)
      document.getElementById('order').setAttribute('class', '');
    let nav: any = document.getElementsByClassName('main-nav')[0];
    if (window.innerWidth < 800) {
      nav.setAttribute('class', 'main-nav dark stick-fixed mobile-on');
    }
    else {
      nav.setAttribute('class', 'main-nav dark stick-fixed');
    }
    this.getOrders()
  }
  orders;

  getOrders() {
    this.Api.getOrders()
      .subscribe(
      (data) => {
        this.spinner.stop();
        console.log("User Orders", data);
        this.orders = data.data;
      },
      (err) => {
        console.log(err);
        this.onError401(err);
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
  ngOnInit() {
    this.navScrollService.setNav();
  }

}
