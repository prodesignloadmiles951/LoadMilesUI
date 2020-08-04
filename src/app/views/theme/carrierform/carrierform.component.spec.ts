import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierformComponent } from './carrierform.component';

describe('CarrierformComponent', () => {
  let component: CarrierformComponent;
  let fixture: ComponentFixture<CarrierformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
