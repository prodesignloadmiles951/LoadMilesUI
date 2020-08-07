import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadstatusComponent } from './loadstatus.component';

describe('LoadstatusComponent', () => {
  let component: LoadstatusComponent;
  let fixture: ComponentFixture<LoadstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
