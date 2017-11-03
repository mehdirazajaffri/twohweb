import { routing } from './faq.routing';
import { CommonModule } from '@angular/common/index';
import { LocationStrategy, PathLocationStrategy  } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';
import { PolicyComponent } from '../policy/policy.component';
import { SpinnerModule } from '../../spinner/spinner.module';
import { NavScrollService } from '../../apiServices/nav-scroll.service';

@NgModule({
  declarations: [
    FaqComponent,PolicyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    routing,SpinnerModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy  },
    NavScrollService
    
  ],
  bootstrap: []
  
})
export class FaqModule {}