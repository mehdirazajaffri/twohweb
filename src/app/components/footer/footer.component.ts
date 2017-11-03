import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  contactForm : FormGroup;
  constructor(
    private spinner:SpinnerService,
    private Api:ApiService,
    private formBuilder:FormBuilder,
    private router:Router
  ) {
    this.contactForm = formBuilder.group({
      name:[null, Validators.required],
      email:[null, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      phoneNo: [null],
      message:[null, Validators.required],
    })
   }
   PostMessage(obj){
    
    console.log(obj);
    this.Api.postMessage(obj)
    .subscribe(
      (data)=>{
        this.spinner.stop();
        console.log(data);
        document.getElementById('contact-result').innerHTML = '<div class="alert alert-success">'+data.message+'</div>';
        this.contactForm.reset();
        setTimeout(
            ()=>{
              document.getElementById('contact-result').innerHTML = '';
            },3000)
      },
      (err)=>{
        console.log(err);
        document.getElementById('contact-result').innerHTML = '<div class="alert alert-danger">'+JSON.parse(err._body).message+'</div>'
        setTimeout(
            ()=>{
              document.getElementById('contact-result').innerHTML = '';
            },3000)
      }
    )
  }
  checkRoutes(){
    console.log("rout",this.router.url);
    if(this.router.url != "/home")
      this.router.navigate(["/home"]);
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
