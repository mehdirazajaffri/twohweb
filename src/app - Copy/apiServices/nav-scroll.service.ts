import { Injectable } from '@angular/core';
declare var $;

@Injectable()
export class NavScrollService {

  constructor(
  ) {
  }
  activeSiteSection;
  setNav() {
    let nav: any = document.getElementsByClassName('main-nav')[0];
    if (window.innerWidth < 800) {
      nav.setAttribute('class', 'main-nav dark stick-fixed mobile-on');
    }
    else {
      nav.setAttribute('class', 'main-nav dark stick-fixed');
    }
    $("html, body").animate({ scrollTop: 0 });
    var menu_links = $('.scroll-nav li a[class="fragment active"]');
    menu_links.removeClass("active");
  }
}
