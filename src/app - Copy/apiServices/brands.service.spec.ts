import { TestBed, inject } from '@angular/core/testing';

import { BrandsService } from './brands.service';

describe('BrandsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandsService]
    });
  });

  it('should ...', inject([BrandsService], (service: BrandsService) => {
    expect(service).toBeTruthy();
  }));
});
