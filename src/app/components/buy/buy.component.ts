import { Component, OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ApiService } from '../../apiServices/api.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  @ViewChild('loginModal')
      loginmodal :ModalComponent;
  constructor(
    public router:Router,
    private Api:ApiService
  ) { }
  BuyNow(){
    localStorage.removeItem('bill');
    localStorage.removeItem('myCart');
    localStorage.removeItem('obj');
    if(localStorage.getItem('user')==null)
      this.loginmodal.open();
    else if(localStorage.getItem('user')!=null)
      this.router.navigate(['/startShop']);
  }
  doLogin(user){
  	this.Api.loginUser(user)
  	.subscribe(
  		(data) => {
  			console.log(data);
				let user = data;
				localStorage.setItem('user',JSON.stringify(user));
        this.loginmodal.close();				
        document.getElementById('login').setAttribute('class','hidden');
       
        document.getElementById('abc').innerText= "Log Out";
        this.router.navigate(['/startShop']);

  		},
  		(error) =>{
  			console.log(error);
        let msg = JSON.parse(error._body);
			  document.getElementById('alert').innerHTML = "<div class='alert alert-danger' role='alert'>"+msg.message+"</div>	";
				
  		},
  		() =>{
  			console.log("Completed")
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
