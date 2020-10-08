import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadeditformComponent } from './loadeditform.component';

describe('LoadeditformComponent', () => {
  let component: LoadeditformComponent;
  let fixture: ComponentFixture<LoadeditformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadeditformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadeditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
