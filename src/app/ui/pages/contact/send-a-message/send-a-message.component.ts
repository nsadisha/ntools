import { Component } from '@angular/core';
import {NzAutosizeDirective, NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent} from "ng-zorro-antd/form";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApplicationConfig} from "../../../../config/application.config";
import {getInputErrorMessage, validateAllFields} from "../../../../util/form.util";
import {ContactUsModel} from "../../../../model/contact.model";
import {ContactUsApiService} from "../../../../api/contact/contact-us-api.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-send-a-message',
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
  templateUrl: './send-a-message.component.html',
  styleUrl: './send-a-message.component.scss'
})
export class SendAMessageComponent {
  protected maxTextareaLength = ApplicationConfig.MAX_FORM_TEXTAREA_LENGTH;
  private maxInputLength = ApplicationConfig.MAX_FORM_INPUT_LENGTH;

  protected isContactFormSubmitting = false;
  protected contactFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(this.maxInputLength)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.maxLength(this.maxTextareaLength)])
  });

  constructor(
    private contactUsApiService: ContactUsApiService,
    private messageService: NzMessageService
  ) {}

  protected async submitContactUsForm() {
    if (validateAllFields(this.contactFormGroup)) {
      this.isContactFormSubmitting = true;
      const reqData: ContactUsModel = {
        name: this.contactFormGroup.value.name!,
        email: this.contactFormGroup.value.email!,
        message: this.contactFormGroup.value.message!
      };

      try {
        await this.contactUsApiService.sendMessage(reqData);

        this.contactFormGroup.reset();
        this.messageService.success("Message sent successfully!");
      } catch (e) {
        console.error(e);
        this.messageService.error("Failed to send message. Please try again later.");
      } finally {
        this.isContactFormSubmitting = false;
      }
    }
  }

  get contactFormErrorMessages() {
    return {
      name: getInputErrorMessage(this.contactFormGroup.controls.name, "Name"),
      email: getInputErrorMessage(this.contactFormGroup.controls.email, "Email"),
      message: getInputErrorMessage(this.contactFormGroup.controls.message, "Message")
    };
  }
}
