import { Component, OnInit } from '@angular/core';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  sub;
  complexForm2: FormGroup;
  constructor(
    private spinner: SpinnerService,
    public router: Router,
    private Api: ApiService,
    private route: ActivatedRoute,
    formBuilder: FormBuilder,
    private navScrollService: NavScrollService

  ) {
    this.complexForm2 = formBuilder.group({
      verifyPassword: [null, Validators.required],
      newPassword: [null, Validators.required]

    })
  }
  token;
  resetPassword(obj) {
    console.log(obj);
    this.Api.resetPassword(this.token, obj)
      .subscribe(
      (data) => {
        console.log(data);
        this.spinner.stop();
        document.getElementById('alert').innerHTML = "<div class='alert alert-info' role='alert'>Password Succfully Updated</div>";
        setTimeout(function () {
          this.router.navigate(['/login']);
        }, 2000)
      },
      (err) => {
        console.log(err);
        let msg = JSON.parse(err._body);
        document.getElementById('alert').innerHTML = "<div class='alert alert-danger' role='alert'>" + msg.message + "</div>	";
        this.spinner.stop();
      }
      )
  }
  subscribe() {
    console.log('start');
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.token = params['token'];
        console.log(params);
        console.log(this.token);
      });
  }
  ngOnInit() {
    this.subscribe();
    this.navScrollService.setNav();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
