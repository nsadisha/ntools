import {Component, OnInit} from '@angular/core';
import {Category} from "../../../model/category.model";
import {CategoryService} from "../../../service/category/category.service";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {FormsModule} from "@angular/forms";
import {NzAutocompleteComponent, NzAutocompleteTriggerDirective} from "ng-zorro-antd/auto-complete";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {CategoryDisplayCardComponent} from "../../components/category-display-card/category-display-card.component";

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [
    NzRowDirective,
    NzColDirective,
    FormsModule,
    NzAutocompleteComponent,
    NzAutocompleteTriggerDirective,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    NzEmptyComponent,
    CategoryDisplayCardComponent
  ],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss'
})
export class AllCategoriesComponent implements OnInit {
  private typingTimeout: any;
  protected inputValue: string = "";
  protected filteredCategoryNames: string[] = [];
  private categoryNames: string[] = [];
  private inputTimeout = 500;

  protected categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  onChange(value: string): void {
    // Clear any existing timeout
    clearTimeout(this.typingTimeout);

    // Set a new timeout
    this.typingTimeout = setTimeout(() => {
      this.search(this.inputValue);
    }, this.inputTimeout);

    this.filteredCategoryNames = this.categoryNames
      .filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  private search(value: string): void {
    this.categories = this.categoryService.getCategoriesByName(value);
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getAllCategories();
    this.categoryNames = this.categoryService.getAllCategoryNames();
  }

  clearSearch() {
    this.inputValue = "";
    this.categories = this.categoryService.getAllCategories();
  }
}
