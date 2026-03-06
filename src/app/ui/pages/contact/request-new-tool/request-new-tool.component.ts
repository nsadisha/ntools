import { Component } from '@angular/core';
import {NzAutosizeDirective, NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent} from "ng-zorro-antd/form";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApplicationConfig, LayoutConfig} from "../../../../config/application.config";
import {ContactUsApiService} from "../../../../api/contact/contact-us-api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {getInputErrorMessage, validateAllFields} from "../../../../util/form.util";
import {NewToolRequestModel} from "../../../../model/contact.model";

@Component({
  selector: 'app-request-new-tool',
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
  templateUrl: './request-new-tool.component.html',
  styleUrl: './request-new-tool.component.scss'
})
export class RequestNewToolComponent {
  protected maxTextareaLength = ApplicationConfig.MAX_FORM_TEXTAREA_LENGTH;
  private maxInputLength = ApplicationConfig.MAX_FORM_INPUT_LENGTH;

  protected isNewToolFormSubmitting = false;
  protected newToolFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(this.maxInputLength)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    toolName: new FormControl('', [Validators.required, Validators.maxLength(this.maxInputLength)]),
    toolDescription: new FormControl('', [Validators.required, Validators.maxLength(this.maxTextareaLength)])
  });

  constructor(
    private contactUsApiService: ContactUsApiService,
    private messageService: NzMessageService
  ) {}

  protected async submitNewToolRequestForm() {
    if (validateAllFields(this.newToolFormGroup)) {
      this.isNewToolFormSubmitting = true;
      const data: NewToolRequestModel = {
        name: this.newToolFormGroup.value.name!,
        email: this.newToolFormGroup.value.email!,
        tool_name: this.newToolFormGroup.value.toolName!,
        tool_description: this.newToolFormGroup.value.toolDescription!
      };

      try {
        await this.contactUsApiService.requestNewTool(data);

        this.newToolFormGroup.reset();
        this.messageService.success("Request sent successfully!");
      } catch (e) {
        console.error(e);
        this.messageService.error("Failed to send request. Please try again later.");
      } finally {
        this.isNewToolFormSubmitting = false;
      }
    }
  }

  get newToolFormErrorMessages() {
    return {
      name: getInputErrorMessage(this.newToolFormGroup.controls.name, "Name"),
      email: getInputErrorMessage(this.newToolFormGroup.controls.email, "Email"),
      toolName: getInputErrorMessage(this.newToolFormGroup.controls.toolName, "Tool Name"),
      toolDescription: getInputErrorMessage(this.newToolFormGroup.controls.toolDescription, "Tool Description")
    };
  }

  protected readonly LayoutConfig = LayoutConfig;
}
