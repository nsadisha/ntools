import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendAMessageComponent } from './send-a-message.component';
import { overrideAsShallow } from '../../../../testing/shallow';
import { ContactUsApiService } from '../../../../api/contact/contact-us-api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

describe('SendAMessageComponent', () => {
  let fixture: ComponentFixture<SendAMessageComponent>;
  let contactUsApiServiceSpy: jasmine.SpyObj<ContactUsApiService>;
  let messageServiceSpy: jasmine.SpyObj<NzMessageService>;

  beforeEach(() => {
    contactUsApiServiceSpy = jasmine.createSpyObj<ContactUsApiService>('ContactUsApiService', ['sendMessage']);
    messageServiceSpy = jasmine.createSpyObj<NzMessageService>('NzMessageService', ['success', 'error']);

    overrideAsShallow(SendAMessageComponent);
    TestBed.configureTestingModule({
      imports: [SendAMessageComponent],
      providers: [
        { provide: ContactUsApiService, useValue: contactUsApiServiceSpy },
        { provide: NzMessageService, useValue: messageServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(SendAMessageComponent);
    fixture.detectChanges();
  });

  function fillValidForm() {
    fixture.componentInstance['contactFormGroup'].setValue({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Hello there',
    });
  }

  it('should not submit an invalid form', async () => {
    await fixture.componentInstance['submitContactUsForm']();

    expect(contactUsApiServiceSpy.sendMessage).not.toHaveBeenCalled();
    expect(fixture.componentInstance['contactFormGroup'].controls.name.dirty).toBe(true);
  });

  it('should send the message and reset the form on success', async () => {
    contactUsApiServiceSpy.sendMessage.and.resolveTo({} as any);
    fillValidForm();

    await fixture.componentInstance['submitContactUsForm']();

    expect(contactUsApiServiceSpy.sendMessage).toHaveBeenCalledWith({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Hello there',
    });
    expect(messageServiceSpy.success).toHaveBeenCalledWith('Message sent successfully!');
    expect(fixture.componentInstance['contactFormGroup'].value.name).toBeFalsy();
    expect(fixture.componentInstance['isContactFormSubmitting']).toBe(false);
  });

  it('should show an error message when sending fails', async () => {
    spyOn(console, 'error');
    contactUsApiServiceSpy.sendMessage.and.rejectWith(new Error('network error'));
    fillValidForm();

    await fixture.componentInstance['submitContactUsForm']();

    expect(messageServiceSpy.error).toHaveBeenCalledWith('Failed to send message. Please try again later.');
    expect(console.error).toHaveBeenCalled();
    expect(fixture.componentInstance['isContactFormSubmitting']).toBe(false);
  });

  it('should compute an error message for an invalid field', () => {
    fixture.componentInstance['contactFormGroup'].controls.name.markAsDirty();
    fixture.componentInstance['contactFormGroup'].controls.name.updateValueAndValidity();

    expect(fixture.componentInstance.contactFormErrorMessages.name).toBe('Name is required.');
  });
});
