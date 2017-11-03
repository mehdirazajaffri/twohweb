import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../apiServices/api.service';
import { SpinnerService } from '../../apiServices/spinner.service';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.css']
})
export class NewsLetterComponent implements OnInit {
  subscribeForm;
  constructor(
    private Api: ApiService,
    private spinner: SpinnerService
  ) {
    this.subscribeForm = new FormGroup({
      email: new FormControl(null, [Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])
    })
  }

  subscribe(Email){
      this.Api.subscribe(Email)
      .subscribe(
        (data)=>{
          console.log(data);
          document.getElementById('subscribe-result').innerHTML = '<div class="alert alert-success">Successfully subscribed</div>';
           this.spinner.stop();
           this.subscribeForm.reset();
          setTimeout(
            ()=>{
              document.getElementById('subscribe-result').innerHTML = '';
            },3000)
          
        },
        (err)=>{
          console.log(err);
          document.getElementById('subscribe-result').innerHTML = '<div class="alert alert-danger">'+JSON.parse(err._body).message+'</div>'
           this.spinner.stop();
           setTimeout(
            ()=>{
              document.getElementById('subscribe-result').innerHTML = '';
            },3000)
          
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
