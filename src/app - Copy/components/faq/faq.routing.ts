import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqComponent } from './faq.component';
import { PolicyComponent } from '../policy/policy.component';

const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'policy', component: PolicyComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);