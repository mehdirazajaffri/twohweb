import { Component, OnInit } from '@angular/core';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  constructor(
    private navScrollService: NavScrollService
  ) {
  }

  ngOnInit() {
    this.navScrollService.setNav();
  }

}
