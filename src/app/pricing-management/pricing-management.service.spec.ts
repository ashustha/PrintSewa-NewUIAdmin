import { TestBed, inject } from '@angular/core/testing';

import { PricingManagementService } from './pricing-management.service';

describe('PricingManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricingManagementService]
    });
  });

  it('should be created', inject([PricingManagementService], (service: PricingManagementService) => {
    expect(service).toBeTruthy();
  }));
});
