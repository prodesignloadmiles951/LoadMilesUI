import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerformComponent } from './trailerform.component';

describe('TrailerformComponent', () => {
  let component: TrailerformComponent;
  let fixture: ComponentFixture<TrailerformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
