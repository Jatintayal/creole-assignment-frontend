import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateCustomerComponent } from './edit-create-customer.component';

describe('EditCreateCustomerComponent', () => {
  let component: EditCreateCustomerComponent;
  let fixture: ComponentFixture<EditCreateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCreateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
