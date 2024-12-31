import { Component } from '@angular/core';
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NzIconDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
