import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolNotFoundComponent } from './tool-not-found.component';

describe('ToolNotFoundComponent', () => {
  let component: ToolNotFoundComponent;
  let fixture: ComponentFixture<ToolNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
