import { Component, OnInit } from '@angular/core';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(
    private navScrollService: NavScrollService
  ) { }

  ngOnInit() {
    this.navScrollService.setNav();
  }

}
