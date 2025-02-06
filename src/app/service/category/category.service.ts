import { Injectable } from '@angular/core';
import {Category, CategoryType} from "../../model/category.model";
import {Tool} from "../../model/tool.model";
import {categories} from "../../config/categories.config";
import {tools} from "../../config/tools.config";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly tools: Tool[];
  private readonly categories: Category[];

  constructor() {
    this.tools = tools;
    this.categories = categories;

    categories.forEach(category => {
      category.toolCount = this.getToolCountByCategory(category.type);
    });
  }

  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoriesByName(name: string): Category[] {
    return this.categories
      .filter(category => category.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }

  getCategoryByCategoryCode(code: string): Category | undefined {
    return this.categories
      .find(category => category.type == code);
  }

  getAllCategoryNames(): string[] {
    return this.categories.map(tool => tool.name);
  }

  getToolsByCategory(category: CategoryType): Tool[] {
    return this.tools
      .filter(tool => tool.category === category);
  }

  getToolCountByCategory(category: CategoryType): number {
    return this.tools
      .filter(tool => tool.category === category)
      .length;
  }
}
