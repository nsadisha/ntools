import { Component } from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzResultComponent} from "ng-zorro-antd/result";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tool-not-found',
  standalone: true,
    imports: [
        NzButtonComponent,
        NzResultComponent,
        RouterLink
    ],
  templateUrl: './tool-not-found.component.html',
  styleUrl: './tool-not-found.component.scss'
})
export class ToolNotFoundComponent {

}
