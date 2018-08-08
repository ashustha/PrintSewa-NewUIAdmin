import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdditionalOptionsComponent } from './edit-additional-options.component';

describe('EditAdditionalOptionsComponent', () => {
  let component: EditAdditionalOptionsComponent;
  let fixture: ComponentFixture<EditAdditionalOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdditionalOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdditionalOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
