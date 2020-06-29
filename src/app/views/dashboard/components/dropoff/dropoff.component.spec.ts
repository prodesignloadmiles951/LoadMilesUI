import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropoffComponent } from './dropoff.component';

describe('DropoffComponent', () => {
  let component: DropoffComponent;
  let fixture: ComponentFixture<DropoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
