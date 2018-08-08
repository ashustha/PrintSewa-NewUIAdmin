import { TestBed, inject } from '@angular/core/testing';

import { EditAdditionalOptionsService } from './edit-additional-options.service';

describe('EditAdditionalOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditAdditionalOptionsService]
    });
  });

  it('should be created', inject([EditAdditionalOptionsService], (service: EditAdditionalOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
