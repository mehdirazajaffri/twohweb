import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';

declare var $: any;
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  constructor(
    private spinner: SpinnerService,
    private Api:ApiService) {
    // this.setItemsToShow();
        this.getDeals();
  }
  items : any = [
 
    ];
  itemsToShow = [];
  // setItemsToShow() {
  //   if(this.items.length== 6 )
  //     this.itemsToShow.push(this.items);
  //   else{
  //   //breaks items array into 6 pieces
  //   let count1 = this.items.length % 6;
  //   let count2 = 0;

  //   let temp = [];
  //   for (let item of this.items) {
  //     temp.push(item);
  //     count2++;
  //     if (temp.length == 6) {
  //       count2 = 0;
  //       temp = [];
  //     }
  //     if ((temp.length == count1 && count1 == count2) || temp.length == 6) {
  //       this.itemsToShow.push(temp);

  //     }
  //   }
  //     this.Items = this.itemsToShow[0];
  //   }
  //   console.log("items to show")
  //   console.log(this.items)
  //   console.log(this.itemsToShow);
  //   console.log("ITEMS",this.Items);
    


  // }
  getDeals() {
    this.Api.getDeals()
      .subscribe(
      (data) => {
        this.spinner.stop();
        console.log(data)
        this.items = data;
        // this.setItemsToShow();
        setTimeout(
          ()=>{
            $(".feature_slider").not('.slick-initialized').slick({
              arrows: true,
              infinite: true,
              autoplay:true,
              slidesToShow: 4
            });
          },3000)
      },
      (err) => {
        console.log(err)
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
  
  ngOnInit() {
    $(".masonry").imagesLoaded(function(){
            $(".masonry").masonry();
        });
  }

}
