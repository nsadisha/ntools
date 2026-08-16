import { Component } from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent} from "ng-zorro-antd/form";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LayoutConfig} from "../../../config/application.config";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzMessageService} from "ng-zorro-antd/message";
import {DateAndTimeService} from "../../../logic/date-and-time/date-and-time.service";
import {DateDifferenceModel} from "../../../model/date-time.model";
import {isAllValuesEqualTo, removeDuplicates} from "../../../util/object.util";

@Component({
  selector: 'app-age-calculator',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzColDirective,
    NzFormControlComponent,
    NzRowDirective,
    NzTypographyComponent,
    ReactiveFormsModule,
    NzDatePickerComponent
  ],
  templateUrl: './age-calculator.component.html',
  styleUrl: './age-calculator.component.scss'
})
export class AgeCalculatorComponent {
  protected readonly LayoutConfig = LayoutConfig;
  protected results: Partial<DateDifferenceModel>[] = [];
  protected stringResults: string[] = [];

  protected formGroup = new FormGroup({
    birthday: new FormControl<Date | null>(null, [Validators.required]),
    toDate: new FormControl<Date | null>(null, [Validators.required]),
  });

  constructor(
    private messageService: NzMessageService,
    private dateAndTimeService: DateAndTimeService
  ) {}

  protected calculate() {
    if(this.formGroup.valid){
      const birthday = this.formGroup.value.birthday!.getTime();
      const toDate = this.formGroup.value.toDate!.getTime();

      if (toDate < birthday) {
        this.messageService.error("The 'To Date' must be greater than the 'Birthday'.");
        return;
      }

      this.results = this.dateAndTimeService.calculateDateDifference(birthday, toDate)
        .filter(res => !isAllValuesEqualTo(res, "0"));

      this.stringResults = removeDuplicates(
        this.results.map(result => this.dateAndTimeService.formatDateDifference(result))
      );
    } else {
      Object.values(this.formGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
