import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryDisplayCardComponent } from './category-display-card.component';
import { overrideAsShallow } from '../../../testing/shallow';
import { CategoryType } from '../../../model/category.model';

describe('CategoryDisplayCardComponent', () => {
  let fixture: ComponentFixture<CategoryDisplayCardComponent>;

  beforeEach(() => {
    overrideAsShallow(CategoryDisplayCardComponent);
    TestBed.configureTestingModule({ imports: [CategoryDisplayCardComponent] });
    fixture = TestBed.createComponent(CategoryDisplayCardComponent);
  });

  function setToolCount(toolCount: number) {
    fixture.componentInstance.category = {
      id: 1,
      name: 'Text Editor',
      description: 'Text editor tools',
      type: CategoryType.TEXT_EDITOR,
      toolCount,
    };
    fixture.detectChanges();
  }

  it('should report no tools available for zero tools', () => {
    setToolCount(0);
    expect(fixture.componentInstance.toolCount).toBe('No tools available.');
  });

  it('should use singular wording for exactly one tool', () => {
    setToolCount(1);
    expect(fixture.componentInstance.toolCount).toBe('1 Tool');
  });

  it('should use plural wording for more than one tool', () => {
    setToolCount(3);
    expect(fixture.componentInstance.toolCount).toBe('3 Tools');
  });
});
