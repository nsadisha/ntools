import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolDisplayCardComponent } from './tool-display-card.component';

describe('ToolDisplayCardComponent', () => {
  let component: ToolDisplayCardComponent;
  let fixture: ComponentFixture<ToolDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolDisplayCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
