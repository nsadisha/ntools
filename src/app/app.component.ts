import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Route,
  Router,
  RouterLink,
  RouterOutlet, RoutesRecognized
} from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzPageHeaderComponent} from "ng-zorro-antd/page-header";
import {filter} from "rxjs";

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

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        let route = event.state.root.firstChild;

        this.title = route?.data['title'] || '';
        this.subtitle = route?.data['subtitle'] || '';
      }
    });
  }

  get displayHeader(): boolean {
    return this.title !== '' && this.subtitle !== '';
  }
}
