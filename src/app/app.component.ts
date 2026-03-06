import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzPageHeaderComponent} from "ng-zorro-antd/page-header";
import {RouteDataService} from "./service/route-data/route-data.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterLink, NzPageHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected isCollapsed = false;
  protected title = '';
  protected subtitle = '';
  protected back: string | null = null;
  protected url: string = "";

  constructor(private routeDataService: RouteDataService) {
    this.routeDataService.data$.subscribe(data => {
      this.title = data.title || '';
      this.subtitle = data.subtitle || '';
      this.back = (data.back || false) ? '' : null;
    });

    this.routeDataService.navigationEndData$.subscribe((data) => {
      this.url = data.url;
    });
  }

  get displayHeader(): boolean {
    return this.title !== '' && this.subtitle !== '';
  }

  isRouteActive(route: string): boolean {
    return this.url === route;
  }
}
