import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverformComponent } from './driverform.component';

describe('DriverformComponent', () => {
  let component: DriverformComponent;
  let fixture: ComponentFixture<DriverformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
