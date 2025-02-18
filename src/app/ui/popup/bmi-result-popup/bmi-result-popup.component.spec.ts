import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiResultPopupComponent } from './bmi-result-popup.component';

describe('BmiResultPopupComponent', () => {
  let component: BmiResultPopupComponent;
  let fixture: ComponentFixture<BmiResultPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmiResultPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmiResultPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
