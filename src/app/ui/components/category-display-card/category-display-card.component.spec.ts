import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDisplayCardComponent } from './category-display-card.component';

describe('CategoryDisplayCardComponent', () => {
  let component: CategoryDisplayCardComponent;
  let fixture: ComponentFixture<CategoryDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDisplayCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
