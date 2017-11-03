import { Component, OnInit } from '@angular/core';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(
    private navScrollService: NavScrollService
  ) {
  }

  ngOnInit() {
    this.navScrollService.setNav();
  }

}
