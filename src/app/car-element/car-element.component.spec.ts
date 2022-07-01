import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarElementComponent } from './car-element.component';

describe('CarElementComponent', () => {
  let component: CarElementComponent;
  let fixture: ComponentFixture<CarElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
