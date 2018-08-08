import { TestBed, inject } from '@angular/core/testing';

import { EditOffersService } from './edit-offers.service';

describe('EditOffersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditOffersService]
    });
  });

  it('should be created', inject([EditOffersService], (service: EditOffersService) => {
    expect(service).toBeTruthy();
  }));
});
