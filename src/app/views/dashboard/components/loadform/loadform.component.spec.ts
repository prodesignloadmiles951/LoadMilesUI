import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadformComponent } from './loadform.component';

describe('LoadformComponent', () => {
  let component: LoadformComponent;
  let fixture: ComponentFixture<LoadformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
