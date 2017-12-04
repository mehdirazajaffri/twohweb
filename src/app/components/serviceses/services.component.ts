import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private homeComponent: HomeComponent) { }
  closeMenu() {
    if (document.getElementById('cart-list').style.display != 'none')
      document.getElementById('cart-list').style.display = 'none';
    if (document.getElementById('user-details').style.display != 'none')
      document.getElementById('user-details').style.display = 'none';
      console.log('closeMenu')
  }
  orderNow() {
    this.homeComponent.BuyNow();
  }
  ngOnInit() {
  }

}
