import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartShoppingComponent } from '../start-shopping/start-shopping.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: StartShoppingComponent },
  { path: 'shopingCart', component: ShoppingCartComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);