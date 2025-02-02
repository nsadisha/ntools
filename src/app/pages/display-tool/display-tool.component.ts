import {AfterViewInit, Component, Injector, OnInit, Type, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToolService} from "../../service/tool/tool.service";
import {Tool} from "../../model/tool.model";
import {Title} from "@angular/platform-browser";
import {RouteDataService} from "../../service/route-data/route-data.service";

@Component({
  selector: 'app-display-tool',
  standalone: true,
  imports: [],
  templateUrl: './display-tool.component.html',
  styleUrl: './display-tool.component.scss'
})
export class DisplayToolComponent implements OnInit, AfterViewInit {
  private titlePrefix = 'Ntools | ';
  private toolCode!: string;
  private tool!: Tool;

  constructor(
    private injector: Injector,
    private titleService: Title,
    private route: ActivatedRoute,
    private toolService: ToolService,
    private viewContainerRef: ViewContainerRef,
    private routeDataService: RouteDataService,
  ) {}

  ngOnInit() {
    this.toolCode = this.route.snapshot.paramMap.get('code') || '';
    this.tool = this.toolService.getToolFromCode(this.toolCode);
    this.loadComponent(this.tool.component);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.routeDataService.updateData({
        title: this.tool.name,
        subtitle: this.tool.description
      });

      this.titleService.setTitle(this.titlePrefix + this.tool.name);
    });
  }

  loadComponent(component: Type<any>) {
    this.viewContainerRef.clear(); // Remove any previously loaded component

    if (component) {
      this.viewContainerRef.createComponent(component, { injector: this.injector });
    }
  }

}
