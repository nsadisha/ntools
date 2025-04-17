import { Component } from '@angular/core';
import {NzAutosizeDirective, NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent} from "ng-zorro-antd/form";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApplicationConfig} from "../../../../config/application.config";
import {ContactUsApiService} from "../../../../api/contact/contact-us-api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {getInputErrorMessage, validateAllFields} from "../../../../util/form.util";
import {BugReportModel} from "../../../../model/contact.model";

@Component({
  selector: 'app-report-a-bug',
  standalone: true,
    imports: [
        NzAutosizeDirective,
        NzButtonComponent,
        NzCardComponent,
        NzColDirective,
        NzFormControlComponent,
        NzInputDirective,
        NzRowDirective,
        NzTextareaCountComponent,
        NzTypographyComponent,
        ReactiveFormsModule
    ],
  templateUrl: './report-a-bug.component.html',
  styleUrl: './report-a-bug.component.scss'
})
export class ReportABugComponent {
  protected maxTextareaLength = ApplicationConfig.MAX_FORM_TEXTAREA_LENGTH;
  private maxInputLength = ApplicationConfig.MAX_FORM_INPUT_LENGTH;

  protected isBugReportFormSubmitting = false;
  protected bugReportFormGroup = new FormGroup({
    name: new FormControl('', [Validators.maxLength(this.maxInputLength)]),
    email: new FormControl(''),
    bugName: new FormControl('', [Validators.required]),
    bugUrl: new FormControl('', [Validators.required]),
    bugDescription: new FormControl('', [Validators.required, Validators.maxLength(this.maxTextareaLength)])
  });

  constructor(
    private contactUsApiService: ContactUsApiService,
    private messageService: NzMessageService
  ) {}

  protected async submitBugReportForm() {
    if (validateAllFields(this.bugReportFormGroup)) {
      this.isBugReportFormSubmitting = true;
      const data: BugReportModel = {
        name: this.bugReportFormGroup.value.name!,
        email: this.bugReportFormGroup.value.email!,
        bug_name: this.bugReportFormGroup.value.bugName!,
        bug_url: this.bugReportFormGroup.value.bugUrl!,
        bug_description: this.bugReportFormGroup.value.bugDescription!
      };

      try {
        await this.contactUsApiService.reportBug(data);

        this.bugReportFormGroup.reset();
        this.messageService.success("Bug reported successfully!");
      } catch (e) {
        console.error(e);
        this.messageService.error("Failed to report bug. Please try again later.");
      } finally {
        this.isBugReportFormSubmitting = false;
      }
    }
  }

  get bugReportFormErrorMessages() {
    return {
      name: getInputErrorMessage(this.bugReportFormGroup.controls.name, "Name"),
      email: getInputErrorMessage(this.bugReportFormGroup.controls.email, "Email"),
      bugName: getInputErrorMessage(this.bugReportFormGroup.controls.bugName, "Bug Name"),
      bugUrl: getInputErrorMessage(this.bugReportFormGroup.controls.bugUrl, "Bug URL"),
      bugDescription: getInputErrorMessage(this.bugReportFormGroup.controls.bugDescription, "Bug Description")
    };
  }
}
