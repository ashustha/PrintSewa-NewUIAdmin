import { TestBed, inject } from '@angular/core/testing';

import { EditCategoryService } from './edit-category.service';

describe('EditCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditCategoryService]
    });
  });

  it('should be created', inject([EditCategoryService], (service: EditCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
