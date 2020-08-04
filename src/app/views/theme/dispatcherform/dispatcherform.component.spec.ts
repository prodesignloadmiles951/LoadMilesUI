import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherformComponent } from './dispatcherform.component';

describe('DispatcherformComponent', () => {
  let component: DispatcherformComponent;
  let fixture: ComponentFixture<DispatcherformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatcherformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatcherformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
