import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from '../profile/profile.component';
import { OrdersComponent } from '../orders/orders.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'orders', component: OrdersComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);