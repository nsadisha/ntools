import {Component, Input} from '@angular/core';
import {Tool} from "../../../model/tool.model";
import {RouterLink} from "@angular/router";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";

@Component({
  selector: 'app-tool-display-card',
  standalone: true,
    imports: [
        RouterLink,
        NzTypographyComponent,
        NzIconDirective,
        NzTooltipDirective,
    ],
  templateUrl: './tool-display-card.component.html',
  styleUrl: './tool-display-card.component.scss'
})
export class ToolDisplayCardComponent {
  @Input({required: true}) tool!: Tool;
}
