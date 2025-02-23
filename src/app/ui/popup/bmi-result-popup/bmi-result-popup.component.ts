import {Component, inject} from '@angular/core';
import {BmiModel} from "../../../model/bmi.model";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {NgxGaugeModule} from "ngx-gauge";
import {bmiGaugeConfig, bmiMarkerConfig} from "../../../config/ngx-gauge.config";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {toFixed} from "../../../util/string.util";

@Component({
  selector: 'app-bmi-result-popup',
  standalone: true,
  imports: [
    NgxGaugeModule,
    NzRowDirective,
    NzColDirective,
    NzTypographyComponent
  ],
  templateUrl: './bmi-result-popup.component.html',
  styleUrl: './bmi-result-popup.component.scss'
})
export class BmiResultPopupComponent {
  protected readonly data: BmiModel = inject(NZ_MODAL_DATA);
  protected readonly bmiConfig = bmiGaugeConfig;
  protected readonly bmiMarkerConfig = bmiMarkerConfig;

  get bmi() {
    return Number(this.data.bmi.toFixed(2));
  }

  protected readonly toFixed = toFixed;
}
