import { Component } from '@angular/core';
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzFormControlComponent} from "ng-zorro-antd/form";
import {HealthAndFitnessService} from "../../../logic/health-and-fitness/health-and-fitness.service";
import {MarkdownDisplayComponent} from "../../components/markdown-display/markdown-display.component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {LayoutConfig} from "../../../config/application.config";
import {PopupService} from "../../../service/popup/popup.service";
import {BmiResultPopupComponent} from "../../popup/bmi-result-popup/bmi-result-popup.component";
import {BmiModel} from "../../../model/bmi.model";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {Gender} from "../../../util/constants.util";

@Component({
  selector: 'app-bmi-calculator',
  standalone: true,
  imports: [
    NzRowDirective,
    NzColDirective,
    NzInputNumberComponent,
    ReactiveFormsModule,
    NzTypographyComponent,
    NzButtonComponent,
    NzInputGroupComponent,
    NzFormControlComponent,
    MarkdownDisplayComponent,
    NzCardComponent,
    NzSelectComponent,
    NzOptionComponent
  ],
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './bmi-calculator.component.scss'
})
export class BmiCalculatorComponent {
  protected readonly LayoutConfig = LayoutConfig;
  protected readonly genders: { label: string, value: string }[];
  protected bmiEquation = "$$BMI = \\frac{Weight\\ (kg)} {Height\\ (m)^2}$$";
  protected ponderalEquation = "$$PI = \\frac{Weight\\ (kg)} {Height\\ (m)^3}$$";

  protected formGroup = new FormGroup({
    age: new FormControl(25 , [Validators.required, Validators.min(2)]),
    gender: new FormControl(Gender.MALE, [Validators.required]),
    height: new FormControl(170, [Validators.required, Validators.min(1)]),
    weight: new FormControl(63, [Validators.required, Validators.min(1)]),
  });

  constructor(
    private healthAndFitnessService: HealthAndFitnessService,
    private popupService: PopupService
  ) {
    this.genders = this.getGenders();
  }

  calculateBMI() {
    if(this.formGroup.valid){
      const bmiModel = this.healthAndFitnessService.calculateBMI(
        this.formGroup.value.age || 1,
        (this.formGroup.controls.height.value || 1) / 100,
        this.formGroup.controls.weight.value || 1
      );

      this.popupService.createComponentModal<BmiResultPopupComponent, BmiModel>({
        nzTitle: "BMI Result",
        nzContent: BmiResultPopupComponent,
        nzData: bmiModel,
      });
    } else {
      console.log("12993");
      Object.values(this.formGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getGenders() {
    return Object.values(Gender).map(v => ({
      label: v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
      value: v
    }))
  }
}
