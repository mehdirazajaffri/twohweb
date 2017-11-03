import { TestBed, inject } from '@angular/core/testing';

import { BrandsukService } from './brandsuk.service';

describe('BrandsukService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandsukService]
    });
  });

  it('should ...', inject([BrandsukService], (service: BrandsukService) => {
    expect(service).toBeTruthy();
  }));
});
