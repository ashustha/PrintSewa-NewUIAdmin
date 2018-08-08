import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdditionalOptionsComponent } from './add-additional-options.component';

describe('AddAdditionalOptionsComponent', () => {
  let component: AddAdditionalOptionsComponent;
  let fixture: ComponentFixture<AddAdditionalOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdditionalOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdditionalOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
