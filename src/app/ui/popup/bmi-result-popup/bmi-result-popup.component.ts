import {Component, inject} from '@angular/core';
import {BmiModel} from "../../../model/bmi.model";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-bmi-result-popup',
  standalone: true,
  imports: [],
  templateUrl: './bmi-result-popup.component.html',
  styleUrl: './bmi-result-popup.component.scss'
})
export class BmiResultPopupComponent {
  readonly data: BmiModel = inject(NZ_MODAL_DATA);

  get dataString() {
    return JSON.stringify(this.data);
  }
}
