import { TestBed } from '@angular/core/testing';
import { ToolDisplayCardComponent } from './tool-display-card.component';
import { overrideAsShallow } from '../../../testing/shallow';
import { Tool, ToolType } from '../../../model/tool.model';
import { CategoryType } from '../../../model/category.model';
import { ToolNotFoundComponent } from '../../tools/tool-not-found/tool-not-found.component';

describe('ToolDisplayCardComponent', () => {
  it('should render the bound tool', () => {
    overrideAsShallow(ToolDisplayCardComponent);
    TestBed.configureTestingModule({ imports: [ToolDisplayCardComponent] });
    const fixture = TestBed.createComponent(ToolDisplayCardComponent);
    const tool: Tool = {
      id: 1,
      name: 'Test Tool',
      description: 'A tool for testing',
      toolCode: ToolType.PLAIN_TEXT_EDITOR,
      category: CategoryType.TEXT_EDITOR,
      component: ToolNotFoundComponent,
    };
    fixture.componentInstance.tool = tool;

    fixture.detectChanges();

    expect(fixture.componentInstance.tool).toBe(tool);
  });
});
