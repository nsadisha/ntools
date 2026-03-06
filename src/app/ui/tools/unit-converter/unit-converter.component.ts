import { Component } from '@angular/core';
import {UnitConverterService} from "../../../logic/unit-converter/unit-converter.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent} from "ng-zorro-antd/form";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {ApplicationConfig, LayoutConfig} from "../../../config/application.config";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {isNullOrEmpty} from "../../../util/string.util";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {Measure, Unit} from "convert-units";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {validateRoundNumber} from "../../../util/number.util";

@Component({
  selector: 'app-unit-converter',
  standalone: true,
  imports: [
    FormsModule,
    NzCardComponent,
    NzColDirective,
    NzFormControlComponent,
    NzRowDirective,
    NzTypographyComponent,
    ReactiveFormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzInputNumberComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzTooltipDirective
  ],
  templateUrl: './unit-converter.component.html',
  styleUrl: './unit-converter.component.scss'
})
export class UnitConverterComponent {
  protected readonly LayoutConfig = LayoutConfig;
  protected readonly measures: { value: string, label: string }[] = [];
  protected fromUnits: { value: string, label: string }[] = [];
  protected toUnits: { value: string, label: string }[] = [];
  protected roundDigits = ApplicationConfig.DEFAULT_ROUND_DIGITS;
  protected selectedMeasure = "";
  private result: number = 0;
  private bestResult: { val: number; unit: string; singular: string; plural: string } | null = null;

  protected formGroup = new FormGroup({
    value: new FormControl<number | null>(null, [Validators.required]),
    from: new FormControl<Unit | null>(null, [Validators.required]),
    to: new FormControl<Unit | null>(null, [Validators.required])
  });

  constructor(private unitConverterService: UnitConverterService) {
    this.measures = this.unitConverterService.getMeasures();

    this.formGroup.controls.from.valueChanges.subscribe(value => this.onFromUnitChange(value));

    this.formGroup.valueChanges.subscribe(snapshot => {
      if (this.isFormGroupValid) {
        this.result = this.unitConverterService.convert(snapshot.value!, snapshot.from!, snapshot.to!);
        this.bestResult = this.unitConverterService.convertToBest(snapshot.value!, snapshot.from!);
      }
    });
  }

  get isMeasureSelected() {
    return !isNullOrEmpty(this.selectedMeasure)
  }

  get isFromUnitSelected() {
    return this.formGroup.value.from != null && this.formGroup.value.from.trim().length > 0;
  }

  onMeasureChanged($event: Measure) {
    this.fromUnits = this.unitConverterService.getMeasurePossibilities($event).map(unit => ({
      value: unit.abbr,
      label: unit.singular + " (" + unit.abbr + ")"
    }));
    this.formGroup.controls.from.reset();
    this.formGroup.controls.to.reset();
  }

  onFromUnitChange(from: Unit | null) {
    if (from) {
      this.toUnits = this.unitConverterService.getConversionPossibilities(from).map(unit => ({
        value: unit.abbr,
        label: unit.singular + " (" + unit.abbr + ")"
      }));
    }
  }

  get isFormGroupValid() {
    return this.formGroup.valid;
  }

  get resultString() {
    const value = this.formGroup.value.value!;
    const from = this.formGroup.value.from!;
    return value + " " + from + " = " + this.result.toFixed(this.roundDigits) + " " + this.formGroup.value.to;
  }

  get bestResultString() {
    const value = this.formGroup.value.value!;
    const from = this.formGroup.value.from!;
    return value + " " + from + " = " + this.bestResult?.val + " " + this.bestResult?.unit;
  }

  get showBestResult() {
    return this.bestResult != null && this.formGroup.value.to !== this.bestResult!.unit;
  }

  validateRoundDigits() {
    this.roundDigits = validateRoundNumber(this.roundDigits);
  }
}
