import { routing } from './lazy.routing';
import { CommonModule } from '@angular/common/index';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { FacebookService, FacebookLoginResponse } from 'ng2-facebook-sdk';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AuthService } from '../../apiServices/auth.service';
import { GlobalService } from '../../apiServices/global.service';
import { AuthInterceptorService } from '../../apiServices/auth-interceptor.service';
import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';

import { RouterModule } from '@angular/router';

import { SDKBrowserModule } from '../../_index';
import { SummaryPipe } from '../../pipes/summary.pipe';

import { HttpInterceptor, HttpInterceptorModule } from 'angular2-http-interceptor';

import { SpinnerModule } from '../../spinner/spinner.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartShoppingUkComponent } from '../start-shopping-uk/start-shopping-uk.component';
import { ShoppingCartComponent } from '../shopping-cart-uk/shopping-cart.component';
import { BrandsModule } from '../brands/brands.module';
import { NavScrollService } from '../../apiServices/nav-scroll.service';


@NgModule({
  declarations: [
    StartShoppingUkComponent, ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    Ng2Bs3ModalModule,
    RouterModule,
    routing,
    SDKBrowserModule.forRoot(),
    HttpInterceptorModule.withInterceptors([{
      provide: HttpInterceptor,
      useClass: AuthInterceptorService,
      multi: true
    }]),
    ReactiveFormsModule, BrandsModule, SpinnerModule


  ],
  providers: [
    FacebookService,
    GlobalService,
    AuthInterceptorService, SpinnerService, ApiService,
    AuthService, NavScrollService,
    { provide: LocationStrategy, useClass: PathLocationStrategy }

  ],
  bootstrap: []

})
export class LazyModule { }