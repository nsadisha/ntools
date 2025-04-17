import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAMessageComponent } from './send-a-message.component';

describe('SendAMessageComponent', () => {
  let component: SendAMessageComponent;
  let fixture: ComponentFixture<SendAMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendAMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendAMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
