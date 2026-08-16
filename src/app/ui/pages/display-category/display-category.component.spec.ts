import { fakeAsync, tick } from '@angular/core/testing';
import { DisplayCategoryComponent } from './display-category.component';
import { Category, CategoryType } from '../../../model/category.model';
import { Tool, ToolType } from '../../../model/tool.model';
import { ToolNotFoundComponent } from '../../tools/tool-not-found/tool-not-found.component';

describe('DisplayCategoryComponent', () => {
  let titleSpy: jasmine.SpyObj<any>;
  let categoryServiceSpy: jasmine.SpyObj<any>;
  let routeDataServiceSpy: jasmine.SpyObj<any>;

  const category: Category = {
    id: 1,
    name: 'Text Editor',
    description: 'Text editor tools',
    type: CategoryType.TEXT_EDITOR,
  };

  const tool: Tool = {
    id: 1,
    name: 'Plain Text Editor',
    description: 'A simple text editor for writing notes.',
    toolCode: ToolType.PLAIN_TEXT_EDITOR,
    category: CategoryType.TEXT_EDITOR,
    component: ToolNotFoundComponent,
  };

  function createComponent(categoryCode: string | null, found: boolean): DisplayCategoryComponent {
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', [
      'getCategoryByCategoryCode',
      'getToolsByCategory',
    ]);
    categoryServiceSpy.getCategoryByCategoryCode.and.returnValue(found ? category : undefined);
    categoryServiceSpy.getToolsByCategory.and.returnValue([tool]);
    routeDataServiceSpy = jasmine.createSpyObj('RouteDataService', ['updateData']);

    const route = { snapshot: { paramMap: { get: () => categoryCode } } } as any;

    return new DisplayCategoryComponent(titleSpy, route, categoryServiceSpy, routeDataServiceSpy);
  }

  it('should load the matched category and its tools', fakeAsync(() => {
    const component = createComponent(CategoryType.TEXT_EDITOR, true);

    component.ngOnInit();
    component.ngAfterViewInit();
    tick();

    expect(component['category']).toEqual(category);
    expect(component['tools']).toEqual([tool]);
    expect(routeDataServiceSpy.updateData).toHaveBeenCalledWith({
      title: category.name,
      subtitle: category.description,
    });
    expect(titleSpy.setTitle).toHaveBeenCalledWith('Ntools | ' + category.name);
  }));

  it('should report category-not-found route data and title', fakeAsync(() => {
    const component = createComponent('unknown-code', false);

    component.ngOnInit();
    component.ngAfterViewInit();
    tick();

    expect(component['tools']).toEqual([]);
    expect(routeDataServiceSpy.updateData).toHaveBeenCalledWith({
      title: 'Category Not Found',
      subtitle: 'The category you are looking for does not exist.',
    });
    expect(titleSpy.setTitle).toHaveBeenCalledWith('Ntools | Category Not Found!');
  }));

  it('should default the route code to an empty string when absent', () => {
    const component = createComponent(null, false);

    component.ngOnInit();

    expect(categoryServiceSpy.getCategoryByCategoryCode).toHaveBeenCalledWith('');
  });
});
