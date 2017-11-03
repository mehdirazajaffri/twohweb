import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { BillComponent } from './components/bill/bill.component';
import { BillukComponent } from './components/billuk/bill.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TermsComponent } from './components/terms/terms.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bill', component: BillComponent },
  { path: 'billuk', component: BillukComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'help', loadChildren: './components/faq/faq.module#FaqModule' },
  { path: 'buyNow', loadChildren: './components/lazy/lazy.module#LazyModule' },
  { path: 'buyNowuk', loadChildren: './components/lazy2/lazy.module#LazyModule' },
  { path: 'profile', loadChildren: './components/lazyProfile/lazy.module#LazyModule' }
];

// export const routing = RouterModule.forRoot(routes);
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

