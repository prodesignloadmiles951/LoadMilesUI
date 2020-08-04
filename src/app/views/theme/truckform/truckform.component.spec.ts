import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckformComponent } from './truckform.component';

describe('TruckformComponent', () => {
  let component: TruckformComponent;
  let fixture: ComponentFixture<TruckformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
