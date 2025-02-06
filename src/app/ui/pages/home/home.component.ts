import { Component } from '@angular/core';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {RouterLink} from "@angular/router";

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

}
