import { TestBed, inject } from '@angular/core/testing';

import { EditAdminService } from './edit-admin.service';

describe('EditAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditAdminService]
    });
  });

  it('should be created', inject([EditAdminService], (service: EditAdminService) => {
    expect(service).toBeTruthy();
  }));
});
