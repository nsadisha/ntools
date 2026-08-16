import { Component } from '@angular/core';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {RouterLink} from "@angular/router";
import {ToolService} from "../../../service/tool/tool.service";
import {CategoryService} from "../../../service/category/category.service";
import {ThemeService} from "../../../service/theme/theme.service";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NzIconModule,
    NzTypographyComponent,
    NzRowDirective,
    NzColDirective,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly toolCount: number;
  protected readonly categoryCount: number;

  protected readonly features: Feature[] = [
    {
      icon: 'appstore',
      title: 'All-in-One',
      description: 'Every tool in one place — no more app-switching.'
    },
    {
      icon: 'thunderbolt',
      title: 'Fast & Convenient',
      description: 'Nothing to install. Open your browser and go.'
    },
    {
      icon: 'smile',
      title: 'Easy to Use',
      description: 'Simple, intuitive tools anyone can pick up instantly.'
    },
    {
      icon: 'gift',
      title: 'Free & Accessible',
      description: 'No hidden costs, no accounts — just useful tools.'
    }
  ];

  constructor(
    private toolService: ToolService,
    private categoryService: CategoryService,
    protected themeService: ThemeService
  ) {
    this.toolCount = this.toolService.getAllTools().length;
    this.categoryCount = this.categoryService.getAllCategories().length;
  }

  get logoSrc(): string {
    const variant = this.themeService.resolvedTheme() === 'dark' ? 'light' : 'dark';
    return `assets/images/ntools_logo_${variant}_v.svg`;
  }
}
