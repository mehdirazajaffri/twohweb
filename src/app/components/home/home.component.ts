import { Component, OnInit, ViewChild, DoCheck, AfterViewChecked } from '@angular/core';
import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookService, FacebookLoginResponse, FacebookInitParams } from 'ng2-facebook-sdk';
declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
  @ViewChild('subscribeModal')
  subscribeModal: ModalComponent;
  subscribeForm;
  subscribeModalOpen;
  loginForm;
  @ViewChild('loginModal')
  loginmodal: ModalComponent;
  @ViewChild('Contactmodal')
  Contactmodal: ModalComponent;
  isEmail;
  userLogin;
  user;
  socialLogin;
  contactForm;
  constructor(
    private spinner:SpinnerService,
    private formBuilder:FormBuilder,
    private router: Router,
    private fb: FacebookService,
    private Api:ApiService){
    this.getBanners();
    if(localStorage.getItem('user') != undefined){
      document.getElementById('order').setAttribute('class','');
      document.getElementById('userLogin').setAttribute('class','');
    }
    let nav : any = document.getElementsByClassName('main-nav')[0];
    if(window.innerWidth <800){
      nav.setAttribute('class','main-nav dark js-transparent stick-fixed small-height mobile-on');
    }
    else{
      nav.setAttribute('class','main-nav dark js-transparent stick-fixed small-height');
    }

    
    setTimeout(()=>{
        if(localStorage.getItem('user') == null){
            if(this.router.url == '/home')
              this.subscribeModal.open();
        }
    },15000)
    this.subscribeForm = formBuilder.group({
      email: [null, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
    })
    this.loginForm = new FormGroup({
      usernameOrEmail: new FormControl(null,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ),
      password: new FormControl(null, Validators.required)
    })
    this.contactForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)),
      phoneNo: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
    })
  }
  

  
  
  banners ;
  getBanners(){
    this.Api.getBanners()
    .subscribe(
      (data)=>{
        this.spinner.stop();
        console.log(data);
        this.banners = data;
        console.log("Banners");
        console.log(this.banners)
      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        console.log("Banner api called");
      }
    )
  }
  subscribe(Email){
      this.Api.subscribe(Email)
      .subscribe(
        (data)=>{
          console.log(data);
          document.getElementById('subscribeMsg').innerHTML = '<div class="alert alert-success">Successfully subscribed</div>'
           this.spinner.stop();
          setTimeout(
            ()=>{
              this.subscribeModal.close();
            },2000)
          
        },
        (err)=>{
          console.log(err);
          document.getElementById('subscribeMsg').innerHTML = '<div class="alert alert-danger">'+JSON.parse(err._body).message+'</div>'
           this.spinner.stop();
          
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
  BuyNow() {
    localStorage.removeItem('obj');
    if (localStorage.getItem('user') == null)
      this.loginmodal.open();
    else if (localStorage.getItem('user') != null)
      this.router.navigate(['/buyNow']);
  }
  doLogin(user) {
    this.Api.loginUser(user)
      .subscribe(
      (data) => {
        this.spinner.stop();
        console.log(data);
        let user = data;
        localStorage.setItem('user', JSON.stringify(user));
        this.loginmodal.close();
        // document.getElementById('abc').innerText= "Log Out";
        // document.getElementById('order').setAttribute('class', '');
        // document.getElementById('userLogin').setAttribute('class', '');
        // this.userLogin = true;
        setTimeout(()=>{this.router.navigate(['/buyNow']);},1000)
        

      },
      (error) => {
        console.log(error);
        let msg = JSON.parse(error._body);
        document.getElementById('alert').innerHTML = "<div class='alert alert-danger' role='alert'>" + msg.message + "</div>	";
        this.spinner.stop()

      },
      () => {
        console.log("Completed")
      }
      )
  }
  fbLogin() {
    this.fb.login().then(
      (response: FacebookLoginResponse) => {
        console.log(response);
        this.spinner.stop();
        this.fb.api('/me' + "?" + "access_token=" + response.authResponse.accessToken + "&fields=id,name,email,picture,first_name,last_name,birthday,gender")
          .then(
          (data) => {
            this.spinner.stop();
            if (data.email == undefined)
              this.isEmail = true;
            this.socialLogin = {
              id: data.id,
              email: data.email,
              first_name: data.first_name,
              last_name: data.last_name,
              displayName: data.name,
              username: "THO" + data.name + new Date(),
              profileImageURL: data.picture.data.url,
              DOB: data.birthday,
              gender: data.gender,
              IsSocailLogin: true
            };


            console.log("fb", data);
            this.spinner.stop();
            console.log(this.socialLogin.email)
            this.Api.loginUser(this.socialLogin)
              .subscribe(
              (data) => {
                console.log("register : ", data);
                this.spinner.stop();
                localStorage.setItem('user', JSON.stringify(data));
                this.userLogin = true;
                this.user = JSON.parse(localStorage.getItem('user'));
                // document.getElementById('order').setAttribute('class', '');
                // document.getElementById('userLogin').setAttribute('class', '');

                this.loginmodal.close();
                this.router.navigate(['/buyNow']);
              },
              (err) => {
                console.log(err);
                this.loginmodal.close();
                this.spinner.stop()
              }
              )


          },
          (err) => {
            console.log(err);
          }
          )
      },
      (error: any) => console.error(error)
    );
  }
  PostMessage(form){
    console.log(form);
    this.Api.postMessage(form)
      .subscribe(
      (data) => {
        this.spinner.stop();
        console.log(data);
        document.getElementById('contact-modal-alert').innerHTML = '<div class="alert alert-success">'+data.message+'</div>';
        this.contactForm.reset();
        setTimeout(
            ()=>{
              document.getElementById('contact-modal-alert').innerHTML = '';
              this.Contactmodal.close();
            },3000)
      },
      (err) => {
        console.log(err);
        document.getElementById('contact-modal-alert').innerHTML = '<div class="alert alert-danger">'+JSON.parse(err._body).message+'</div>'
        setTimeout(
            ()=>{
              document.getElementById('contact-modal-alert').innerHTML = '';
            },3000)
      }
      )

  }
  ngOnInit() {
    //document.getElementById('header').style.height = (window.innerHeight)+'px';
    var sections = $(".home-section, .split-section, .page-section");
        var menu_links = $(".scroll-nav li a");
        
        $(window).scroll(function(){
        
            sections.filter(":in-viewport:first").each(function(){
                var active_section = $(this);
                var active_link = $('.scroll-nav li a[href="/home#' + active_section.attr("id") + '"]');
                menu_links.removeClass("active");
                active_link.addClass("active");
            });
            
        });
        
  }

  ngOnDestroy() {
    
  }
  ngDoCheck(){
    
    setTimeout(()=>{ 
    
       $(".home_slider").not('.slick-initialized').slick({
        infinite: true,
        speed: 500,
        arrows: true,
        autoplay: true,
        slidesToShow: 1
      });

	   $(".top_brand_slider").not('.slick-initialized').slick({
        infinite: true,
		speed: 500,
		 arrows: true,
		autoplay: true,
        slidesToShow: 1
      });
      $(".top_brand_slider-two").not('.slick-initialized').slick({
          infinite: true,
          speed: 500,
          arrows: true,
          autoplay: true,
          slidesToShow: 1
      });
	  
	   $(".testimonial_slider").not('.slick-initialized').slick({
	   arrows: true,
        infinite: true,
        slidesToShow: 3
      });



      }, 2000)
  }

}
