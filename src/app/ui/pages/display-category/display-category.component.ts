import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Category} from "../../../model/category.model";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {RouteDataService} from "../../../service/route-data/route-data.service";
import {CategoryService} from "../../../service/category/category.service";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {ToolDisplayCardComponent} from "../../components/tool-display-card/tool-display-card.component";
import {Tool} from "../../../model/tool.model";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {NzResultComponent} from "ng-zorro-antd/result";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-display-category',
  standalone: true,
  imports: [
    NzRowDirective,
    NzColDirective,
    ToolDisplayCardComponent,
    NzEmptyComponent,
    NzResultComponent,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './display-category.component.html',
  styleUrl: './display-category.component.scss'
})
export class DisplayCategoryComponent implements OnInit, AfterViewInit {
  private titlePrefix = 'Ntools | ';
  private categoryCode!: string;
  protected category: Category | undefined;
  protected tools: Tool[] = [];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private routeDataService: RouteDataService,
  ) {}

  ngOnInit() {
    this.categoryCode = this.route.snapshot.paramMap.get('type') || '';
    this.category = this.categoryService.getCategoryByCategoryCode(this.categoryCode);

    if(this.category != undefined) {
      this.tools = this.categoryService.getToolsByCategory(this.category.type)
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.category == undefined) {
        this.routeDataService.updateData({
          title: 'Category Not Found',
          subtitle: 'The category you are looking for does not exist.'
        });

        this.titleService.setTitle(this.titlePrefix + 'Category Not Found!');
      } else {
        this.routeDataService.updateData({
          title: this.category!.name,
          subtitle: this.category!.description
        });

        this.titleService.setTitle(this.titlePrefix + this.category!.name);
      }
    });
  }
}
