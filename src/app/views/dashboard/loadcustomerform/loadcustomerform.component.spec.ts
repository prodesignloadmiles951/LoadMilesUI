import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadcustomerformComponent } from './loadcustomerform.component';

describe('LoadcustomerformComponent', () => {
  let component: LoadcustomerformComponent;
  let fixture: ComponentFixture<LoadcustomerformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadcustomerformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadcustomerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
