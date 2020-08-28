import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickDropFormComponent } from './pick-drop-form.component';

describe('PickDropFormComponent', () => {
  let component: PickDropFormComponent;
  let fixture: ComponentFixture<PickDropFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickDropFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickDropFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
