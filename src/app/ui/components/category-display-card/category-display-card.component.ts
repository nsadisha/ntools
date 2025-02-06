import {Component, Input} from '@angular/core';
import {Category} from "../../../model/category.model";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {RouterLink} from "@angular/router";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";

@Component({
  selector: 'app-category-display-card',
  standalone: true,
  imports: [
    NzIconDirective,
    NzTypographyComponent,
    RouterLink,
    NzTooltipDirective
  ],
  templateUrl: './category-display-card.component.html',
  styleUrl: './category-display-card.component.scss'
})
export class CategoryDisplayCardComponent {
  @Input({required: true}) category!: Category;

  get toolCount(): string {
    if(this.category.toolCount == 0) {
      return 'No tools available.';
    }
    return this.category.toolCount + ' tools';
  }
}
