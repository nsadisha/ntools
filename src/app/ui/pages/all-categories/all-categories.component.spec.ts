import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AllCategoriesComponent } from './all-categories.component';
import { overrideAsShallow } from '../../../testing/shallow';
import { CategoryService } from '../../../service/category/category.service';
import { Category, CategoryType } from '../../../model/category.model';

describe('AllCategoriesComponent', () => {
  let fixture: ComponentFixture<AllCategoriesComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

  const allCategories: Category[] = [
    { id: 1, name: 'Text Editor', description: '', type: CategoryType.TEXT_EDITOR },
    { id: 2, name: 'Unit Converter', description: '', type: CategoryType.UNIT_CONVERTER },
  ];
  const allCategoryNames = allCategories.map(category => category.name);

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj<CategoryService>('CategoryService', [
      'getAllCategories',
      'getAllCategoryNames',
      'getCategoriesByName',
    ]);
    categoryServiceSpy.getAllCategories.and.returnValue(allCategories);
    categoryServiceSpy.getAllCategoryNames.and.returnValue(allCategoryNames);
    categoryServiceSpy.getCategoriesByName.and.returnValue([allCategories[0]]);

    overrideAsShallow(AllCategoriesComponent);
    TestBed.configureTestingModule({
      imports: [AllCategoriesComponent],
      providers: [{ provide: CategoryService, useValue: categoryServiceSpy }],
    });
    fixture = TestBed.createComponent(AllCategoriesComponent);
    fixture.detectChanges();
  });

  it('should load all categories and category names on init', () => {
    expect(fixture.componentInstance['categories']).toEqual(allCategories);
    expect(categoryServiceSpy.getAllCategoryNames).toHaveBeenCalled();
  });

  it('should immediately filter suggested names as the user types', () => {
    fixture.componentInstance.onChange('text');
    expect(fixture.componentInstance['filteredCategoryNames']).toEqual(['Text Editor']);
  });

  it('should search after the debounce timeout elapses', fakeAsync(() => {
    fixture.componentInstance['inputValue'] = 'text';
    fixture.componentInstance.onChange('text');

    tick(500);

    expect(categoryServiceSpy.getCategoriesByName).toHaveBeenCalledWith('text');
    expect(fixture.componentInstance['categories']).toEqual([allCategories[0]]);
  }));

  it('should clear the search and restore all categories', () => {
    fixture.componentInstance['inputValue'] = 'text';

    fixture.componentInstance.clearSearch();

    expect(fixture.componentInstance['inputValue']).toBe('');
    expect(fixture.componentInstance['categories']).toEqual(allCategories);
  });
});
