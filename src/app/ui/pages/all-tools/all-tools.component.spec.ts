import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AllToolsComponent } from './all-tools.component';
import { overrideAsShallow } from '../../../testing/shallow';
import { ToolService } from '../../../service/tool/tool.service';
import { Tool, ToolType } from '../../../model/tool.model';
import { CategoryType } from '../../../model/category.model';
import { ToolNotFoundComponent } from '../../tools/tool-not-found/tool-not-found.component';

describe('AllToolsComponent', () => {
  let fixture: ComponentFixture<AllToolsComponent>;
  let toolServiceSpy: jasmine.SpyObj<ToolService>;

  const allTools: Tool[] = [
    {
      id: 1,
      name: 'BMI Calculator',
      description: '',
      toolCode: ToolType.BMI_CALCULATOR,
      category: CategoryType.HEALTH_AND_FITNESS_CALCULATOR,
      component: ToolNotFoundComponent,
    },
    {
      id: 2,
      name: 'Age Calculator',
      description: '',
      toolCode: ToolType.AGE_CALCULATOR,
      category: CategoryType.DATE_TIME_CALCULATOR,
      component: ToolNotFoundComponent,
    },
  ];
  const allToolNames = allTools.map(tool => tool.name);

  beforeEach(() => {
    toolServiceSpy = jasmine.createSpyObj<ToolService>('ToolService', [
      'getAllTools',
      'getToolNames',
      'getAllToolsByName',
    ]);
    toolServiceSpy.getAllTools.and.returnValue(allTools);
    toolServiceSpy.getToolNames.and.returnValue(allToolNames);
    toolServiceSpy.getAllToolsByName.and.returnValue([allTools[0]]);

    overrideAsShallow(AllToolsComponent);
    TestBed.configureTestingModule({
      imports: [AllToolsComponent],
      providers: [{ provide: ToolService, useValue: toolServiceSpy }],
    });
    fixture = TestBed.createComponent(AllToolsComponent);
    fixture.detectChanges();
  });

  it('should load all tools and tool names on init', () => {
    expect(fixture.componentInstance['tools']).toEqual(allTools);
    expect(toolServiceSpy.getToolNames).toHaveBeenCalled();
  });

  it('should immediately filter suggested names as the user types', () => {
    fixture.componentInstance.onChange('bmi');
    expect(fixture.componentInstance['filteredToolNames']).toEqual(['BMI Calculator']);
  });

  it('should search after the debounce timeout elapses', fakeAsync(() => {
    fixture.componentInstance['inputValue'] = 'bmi';
    fixture.componentInstance.onChange('bmi');

    tick(500);

    expect(toolServiceSpy.getAllToolsByName).toHaveBeenCalledWith('bmi');
    expect(fixture.componentInstance['tools']).toEqual([allTools[0]]);
  }));

  it('should clear the search and restore all tools', () => {
    fixture.componentInstance['inputValue'] = 'bmi';

    fixture.componentInstance.clearSearch();

    expect(fixture.componentInstance['inputValue']).toBe('');
    expect(fixture.componentInstance['tools']).toEqual(allTools);
  });
});
