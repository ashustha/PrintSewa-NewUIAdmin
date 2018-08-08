import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuperCategoryComponent } from './edit-super-category.component';

describe('EditSuperCategoryComponent', () => {
  let component: EditSuperCategoryComponent;
  let fixture: ComponentFixture<EditSuperCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSuperCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuperCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
