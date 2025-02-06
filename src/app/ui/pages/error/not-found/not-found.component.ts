import { Component } from '@angular/core';
import {NzResultComponent} from "ng-zorro-antd/result";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    NzResultComponent,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
