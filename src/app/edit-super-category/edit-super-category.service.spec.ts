import { TestBed, inject } from '@angular/core/testing';

import { EditSuperCategoryService } from './edit-super-category.service';

describe('EditSuperCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditSuperCategoryService]
    });
  });

  it('should be created', inject([EditSuperCategoryService], (service: EditSuperCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
