import { Injector } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { DisplayToolComponent } from './display-tool.component';
import { ToolNotFoundComponent } from '../../tools/tool-not-found/tool-not-found.component';
import { Tool, ToolType } from '../../../model/tool.model';
import { CategoryType } from '../../../model/category.model';

describe('DisplayToolComponent', () => {
  let toolServiceSpy: jasmine.SpyObj<any>;
  let titleSpy: jasmine.SpyObj<any>;
  let viewContainerRefSpy: jasmine.SpyObj<any>;
  let routeDataServiceSpy: jasmine.SpyObj<any>;

  const tool: Tool = {
    id: 1,
    name: 'BMI Calculator',
    description: 'A calculator for calculating BMI.',
    toolCode: ToolType.BMI_CALCULATOR,
    category: CategoryType.HEALTH_AND_FITNESS_CALCULATOR,
    component: ToolNotFoundComponent,
  };

  function createComponent(routeCode: string | null): DisplayToolComponent {
    toolServiceSpy = jasmine.createSpyObj('ToolService', ['getToolFromCode']);
    toolServiceSpy.getToolFromCode.and.returnValue(tool);
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    viewContainerRefSpy = jasmine.createSpyObj('ViewContainerRef', ['clear', 'createComponent']);
    routeDataServiceSpy = jasmine.createSpyObj('RouteDataService', ['updateData']);

    const route = { snapshot: { paramMap: { get: () => routeCode } } } as any;

    return new DisplayToolComponent(
      Injector.NULL,
      titleSpy,
      route,
      toolServiceSpy,
      viewContainerRefSpy,
      routeDataServiceSpy
    );
  }

  it('should load the matched tool component and update route data/title', fakeAsync(() => {
    const component = createComponent(ToolType.BMI_CALCULATOR);

    component.ngOnInit();
    component.ngAfterViewInit();
    tick();

    expect(viewContainerRefSpy.clear).toHaveBeenCalled();
    expect(viewContainerRefSpy.createComponent).toHaveBeenCalledWith(ToolNotFoundComponent, {
      injector: Injector.NULL,
    });
    expect(routeDataServiceSpy.updateData).toHaveBeenCalledWith({
      title: tool.name,
      subtitle: tool.description,
    });
    expect(titleSpy.setTitle).toHaveBeenCalledWith('Ntools | ' + tool.name);
  }));

  it('should default the route code to an empty string when absent', () => {
    const component = createComponent(null);

    component.ngOnInit();

    expect(toolServiceSpy.getToolFromCode).toHaveBeenCalledWith('');
  });

  it('should clear without creating a component when none is provided', () => {
    const component = createComponent(ToolType.BMI_CALCULATOR);

    component.loadComponent(undefined as any);

    expect(viewContainerRefSpy.clear).toHaveBeenCalled();
    expect(viewContainerRefSpy.createComponent).not.toHaveBeenCalled();
  });
});
