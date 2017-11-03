import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SpinnerService } from './spinner.service';

@Injectable()
export class BrandsService {
  brands;
  products;
  constructor(
    private Api: ApiService,
    private spinner: SpinnerService
  ) { }
  getBrands() {
    if (this.brands) {
      return this.brands;
    }
    return null;
  }
  setBrands(brands) {
    this.brands = brands;
  }
  getProducts() {
    if (this.products) {
      return this.products;
    }
    return null;
  }
  setProducts(products){
      this.products = products;
  }
}