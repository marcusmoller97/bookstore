import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmChoice } from './confirm-choice';

describe('ConfirmChoice', () => {
  let component: ConfirmChoice;
  let fixture: ComponentFixture<ConfirmChoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmChoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmChoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
