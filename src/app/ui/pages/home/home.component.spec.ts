import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { overrideAsShallow } from '../../../testing/shallow';
import { ToolService } from '../../../service/tool/tool.service';
import { CategoryService } from '../../../service/category/category.service';
import { ThemeService } from '../../../service/theme/theme.service';

describe('HomeComponent', () => {
  function createComponent(resolvedTheme: 'light' | 'dark'): ComponentFixture<HomeComponent> {
    const toolServiceSpy = jasmine.createSpyObj<ToolService>('ToolService', ['getAllTools']);
    toolServiceSpy.getAllTools.and.returnValue([{} as any, {} as any]);
    const categoryServiceSpy = jasmine.createSpyObj<CategoryService>('CategoryService', ['getAllCategories']);
    categoryServiceSpy.getAllCategories.and.returnValue([{} as any]);
    const themeServiceStub = { resolvedTheme: () => resolvedTheme } as unknown as ThemeService;

    overrideAsShallow(HomeComponent);
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ToolService, useValue: toolServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ThemeService, useValue: themeServiceStub },
      ],
    });

    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('should count tools and categories from the services', () => {
    const fixture = createComponent('light');

    expect(fixture.componentInstance['toolCount']).toBe(2);
    expect(fixture.componentInstance['categoryCount']).toBe(1);
  });

  it('should use the light logo variant when the resolved theme is dark', () => {
    const fixture = createComponent('dark');
    expect(fixture.componentInstance.logoSrc).toBe('assets/images/ntools_logo_light_v.svg');
  });

  it('should use the dark logo variant when the resolved theme is light', () => {
    const fixture = createComponent('light');
    expect(fixture.componentInstance.logoSrc).toBe('assets/images/ntools_logo_dark_v.svg');
  });
});
