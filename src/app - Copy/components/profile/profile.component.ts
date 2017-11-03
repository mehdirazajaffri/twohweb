import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../apiServices/api.service';
import { SpinnerService } from '../../apiServices/spinner.service';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  complexForm;
  url;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private Api: ApiService,
    private spinner: SpinnerService,
    private navScrollService: NavScrollService
  ) {
    if (localStorage.getItem('user') != null)
      this.user = JSON.parse(localStorage.getItem('user'));
    this.complexForm = formBuilder.group({
      first_Name: [this.user.firstName, Validators.required],
      last_Name: [this.user.lastName, Validators.required],
      username: [this.user.displayName, Validators.required],
      Email: [this.user.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      PhoneNo: [this.user.phone, Validators.required],
      Date: [this.user.dob, Validators.required],
      address: [this.user.address, Validators.required],
    })
    this.url = this.router.url;
    console.log(this.url);
  }

  editProfile(newProfile) {
    console.log(newProfile);
    let obj = {
      _id: this.user._id,
      firstName: newProfile.first_Name,
      lastName: newProfile.last_Name,
      email: newProfile.Email,
      username: newProfile.username,
      dob: newProfile.Date,
      phone: newProfile.PhoneNo,
      address: newProfile.address
    }
    this.Api.editUser(obj)
      .subscribe(
      (data) => {
        console.log(data);
        this.spinner.stop();
        this.user = data;
        document.getElementById('editMsg').innerHTML = '<div class="alert alert-success">Successfully Edited</div>';
        localStorage.setItem('user', JSON.stringify(data));

      },
      (err) => {
        console.log(err);
        document.getElementById('editMsg').innerHTML = '<div class="alert alert-danger">' + JSON.parse(err._body).message + '</div>';
        this.spinner.stop();
        this.onError401(err);

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
  onError401(err) {
    if (err.status === 401) {
      this.spinner.stop();
      console.log('redirect to login');
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } else {
      console.log(err.statusText);
    }
  }
  ngOnInit() {
    this.navScrollService.setNav();
  }
  }