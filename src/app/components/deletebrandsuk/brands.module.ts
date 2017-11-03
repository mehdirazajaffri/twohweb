import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';

@NgModule({
  declarations: [BrandsComponent],
  imports: [CommonModule],
  exports: [BrandsComponent] 
})
export class BrandsModule{}