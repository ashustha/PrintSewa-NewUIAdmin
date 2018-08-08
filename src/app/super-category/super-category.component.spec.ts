import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperCategoryComponent } from './super-category.component';

describe('SuperCategoryComponent', () => {
  let component: SuperCategoryComponent;
  let fixture: ComponentFixture<SuperCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
