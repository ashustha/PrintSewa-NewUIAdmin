import { TestBed, inject } from '@angular/core/testing';

import { CreateAdminService } from './create-admin.service';

describe('CreateAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateAdminService]
    });
  });

  it('should be created', inject([CreateAdminService], (service: CreateAdminService) => {
    expect(service).toBeTruthy();
  }));
});
