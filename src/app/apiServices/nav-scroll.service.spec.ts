import { TestBed, inject } from '@angular/core/testing';

import { NavScrollService } from './nav-scroll.service';

describe('NavScrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavScrollService]
    });
  });

  it('should ...', inject([NavScrollService], (service: NavScrollService) => {
    expect(service).toBeTruthy();
  }));
});
