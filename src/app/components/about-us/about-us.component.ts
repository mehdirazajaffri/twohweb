import { Component, OnInit } from '@angular/core';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(
    private navScrollService: NavScrollService
  ) {
    
  }

  ngOnInit() {
    this.navScrollService.setNav();
  }

}
