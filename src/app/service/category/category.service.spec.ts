import { CategoryService } from './category.service';
import { CategoryType } from '../../model/category.model';
import { categories } from '../../config/categories.config';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    service = new CategoryService();
  });

  it('should return all configured categories', () => {
    expect(service.getAllCategories().map(category => category.type)).toEqual(
      categories.map(category => category.type)
    );
  });

  it('should return categories matching the name case-insensitively', () => {
    expect(service.getCategoriesByName('text')).toEqual([
      categories.find(category => category.type === CategoryType.TEXT_EDITOR)!,
    ]);
  });

  it('should return an empty array when no category matches the name', () => {
    expect(service.getCategoriesByName('no-such-category')).toEqual([]);
  });

  it('should return the category matching the given code', () => {
    expect(service.getCategoryByCategoryCode(CategoryType.TEXT_EDITOR)?.type).toBe(
      CategoryType.TEXT_EDITOR
    );
  });

  it('should return undefined for an unknown category code', () => {
    expect(service.getCategoryByCategoryCode('unknown-code')).toBeUndefined();
  });

  it('should return all category names', () => {
    expect(service.getAllCategoryNames()).toEqual(categories.map(category => category.name));
  });

  it('should return the tools belonging to a category', () => {
    const result = service.getToolsByCategory(CategoryType.TEXT_EDITOR);
    expect(result.every(tool => tool.category === CategoryType.TEXT_EDITOR)).toBe(true);
    expect(result.length).toBe(2);
  });

  it('should count multiple tools in a category', () => {
    expect(service.getToolCountByCategory(CategoryType.TEXT_EDITOR)).toBe(2);
  });

  it('should count a single tool in a category', () => {
    expect(service.getToolCountByCategory(CategoryType.UNIT_CONVERTER)).toBe(1);
  });

  it('should count zero tools for a category with none assigned', () => {
    expect(service.getToolCountByCategory(CategoryType.OTHER_CALCULATOR)).toBe(0);
  });
});
