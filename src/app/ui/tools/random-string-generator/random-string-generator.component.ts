import { Component } from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent} from "ng-zorro-antd/form";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LayoutConfig} from "../../../config/application.config";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {RandomGeneratorService} from "../../../logic/random-generator/random-generator.service";
import {ValidRandomStringTypeModel} from "../../../model/random.model";
import {Options} from "crypto-random-string";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";

@Component({
  selector: 'app-random-string-generator',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzColDirective,
    NzFormControlComponent,
    NzRowDirective,
    NzTypographyComponent,
    ReactiveFormsModule,
    NzInputNumberComponent,
    NzOptionComponent,
    NzSelectComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent
  ],
  templateUrl: './random-string-generator.component.html',
  styleUrl: './random-string-generator.component.scss'
})
export class RandomStringGeneratorComponent {
  protected readonly LayoutConfig = LayoutConfig;
  protected isFormSubmitted = false;
  protected randomString = "";
  protected randomStringTypes: ValidRandomStringTypeModel[];

  protected formGroup = new FormGroup({
    length: new FormControl<number>(8, [Validators.required]),
    type: new FormControl<string | null>(null, []),
    characters: new FormControl<string | null>(null, [])
  });

  constructor(private randomGeneratorService: RandomGeneratorService) {
    this.randomStringTypes = randomGeneratorService.getValidRandomStringTypes();
  }

  generate() {
    this.isFormSubmitted = true;
    this.randomString = this.randomGeneratorService.generateRandomString(this.stringOptions as Options)
  }

  get stringOptions() {
    const formValue = this.formGroup.value;

    let options = {}

    if(formValue.length) {
      options = { ...options, length: formValue.length! };
    }

    if(formValue.type) {
      options = { ...options, type: formValue.type! };
    } else if(formValue.characters) {
      options = { ...options, characters: formValue.characters! };
    }

    return options;
  }

  get showAdditionalOptions() {
    return this.formGroup.value.type == null || false
  }
}
