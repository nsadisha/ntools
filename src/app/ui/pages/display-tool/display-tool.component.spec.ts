import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayToolComponent } from './display-tool.component';

describe('DisplayToolComponent', () => {
  let component: DisplayToolComponent;
  let fixture: ComponentFixture<DisplayToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
