import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropoffpopupformComponent } from './dropoffpopupform.component';

describe('DropoffpopupformComponent', () => {
  let component: DropoffpopupformComponent;
  let fixture: ComponentFixture<DropoffpopupformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropoffpopupformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropoffpopupformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
