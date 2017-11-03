import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Compiler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy  } from '@angular/common';

import {FacebookService, FacebookLoginResponse} from 'ng2-facebook-sdk';

import { AppComponent } from './app.component';
import { TabsModule } from 'ng2-bootstrap';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AuthService } from './apiServices/auth.service';
import { GlobalService } from './apiServices/global.service';
import { AuthInterceptorService } from './apiServices/auth-interceptor.service';
import {SpinnerService} from './apiServices/spinner.service';
import { ApiService } from './apiServices/api.service';
import { NavScrollService } from './apiServices/nav-scroll.service';
import { BrandsService } from './apiServices/brands.service';

import { SDKBrowserModule } from './_index';


import {HttpInterceptor ,HttpInterceptorModule} from 'angular2-http-interceptor';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { SummaryPipe } from './pipes/summary.pipe';
import { FileUploadModule } from 'ng2-file-upload';

import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/serviceses/services.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { BlogComponent } from './components/blog/blog.component';
import { NewsLetterComponent } from './components/news-letter/news-letter.component';
import { ContactComponent } from './components/contact/contact.component';
import { BuyComponent } from './components/buy/buy.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { routing } from './router';
import { BrandsModule } from './components/brands/brands.module';
import { BillComponent } from './components/bill/bill.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SpinnerModule } from './spinner/spinner.module';
import { TermsComponent } from './components/terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesComponent,
    PortfolioComponent,
    WhyChooseUsComponent,
    ReviewsComponent,
    BlogComponent,
    NewsLetterComponent,
    ContactComponent,
    BuyComponent,
    FooterComponent,
    BillComponent,
    LoginComponent,
    SummaryPipe,
    ForgotPasswordComponent,
    AboutUsComponent,
    TermsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TabsModule.forRoot(),
    Ng2Bs3ModalModule,
    RouterModule,
    routing,
    SDKBrowserModule.forRoot(),
    HttpInterceptorModule.withInterceptors(      [{
                                                   provide: HttpInterceptor,
                                                   useClass: AuthInterceptorService,
                                                   multi: true
                                                 }]),
    ReactiveFormsModule,BrandsModule,SpinnerModule
    
  ],
  providers: [
    FacebookService,
    GlobalService,
    AuthInterceptorService,SpinnerService,ApiService,
    AuthService,NavScrollService,BrandsService,
    { provide: LocationStrategy, useClass: PathLocationStrategy  }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { 
  constructor(private _compiler: Compiler){
    this._compiler.clearCache();
  }
}
