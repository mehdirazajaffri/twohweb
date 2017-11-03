import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../apiServices/api.service';
import { SpinnerService } from '../../apiServices/spinner.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(
    private Api:ApiService,
    private spinner:SpinnerService
  ) { this.getReviews() }
    reviews;
    getReviews(){
      this.Api.getReviews()
      .subscribe(
        (data)=>{
            this.spinner.stop();
            console.log("reviews : ",data);
            this.reviews = data;
        },
        (err)=>{
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

  ngOnInit() {
  }

}
