import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateupdatepasswordComponent } from './validateupdatepassword.component';

describe('ValidateupdatepasswordComponent', () => {
  let component: ValidateupdatepasswordComponent;
  let fixture: ComponentFixture<ValidateupdatepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateupdatepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateupdatepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
