import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestNewToolComponent } from './request-new-tool.component';
import { overrideAsShallow } from '../../../../testing/shallow';
import { ContactUsApiService } from '../../../../api/contact/contact-us-api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

describe('RequestNewToolComponent', () => {
  let fixture: ComponentFixture<RequestNewToolComponent>;
  let contactUsApiServiceSpy: jasmine.SpyObj<ContactUsApiService>;
  let messageServiceSpy: jasmine.SpyObj<NzMessageService>;

  beforeEach(() => {
    contactUsApiServiceSpy = jasmine.createSpyObj<ContactUsApiService>('ContactUsApiService', ['requestNewTool']);
    messageServiceSpy = jasmine.createSpyObj<NzMessageService>('NzMessageService', ['success', 'error']);

    overrideAsShallow(RequestNewToolComponent);
    TestBed.configureTestingModule({
      imports: [RequestNewToolComponent],
      providers: [
        { provide: ContactUsApiService, useValue: contactUsApiServiceSpy },
        { provide: NzMessageService, useValue: messageServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(RequestNewToolComponent);
    fixture.detectChanges();
  });

  function fillValidForm() {
    fixture.componentInstance['newToolFormGroup'].setValue({
      name: 'Jane',
      email: 'jane@example.com',
      toolName: 'CSV Formatter',
      toolDescription: 'Formats CSV files',
    });
  }

  it('should not submit an invalid form', async () => {
    await fixture.componentInstance['submitNewToolRequestForm']();

    expect(contactUsApiServiceSpy.requestNewTool).not.toHaveBeenCalled();
    expect(fixture.componentInstance['newToolFormGroup'].controls.name.dirty).toBe(true);
  });

  it('should send the request and reset the form on success', async () => {
    contactUsApiServiceSpy.requestNewTool.and.resolveTo({} as any);
    fillValidForm();

    await fixture.componentInstance['submitNewToolRequestForm']();

    expect(contactUsApiServiceSpy.requestNewTool).toHaveBeenCalledWith({
      name: 'Jane',
      email: 'jane@example.com',
      tool_name: 'CSV Formatter',
      tool_description: 'Formats CSV files',
    });
    expect(messageServiceSpy.success).toHaveBeenCalledWith('Request sent successfully!');
    expect(fixture.componentInstance['newToolFormGroup'].value.name).toBeFalsy();
    expect(fixture.componentInstance['isNewToolFormSubmitting']).toBe(false);
  });

  it('should show an error message when sending the request fails', async () => {
    spyOn(console, 'error');
    contactUsApiServiceSpy.requestNewTool.and.rejectWith(new Error('network error'));
    fillValidForm();

    await fixture.componentInstance['submitNewToolRequestForm']();

    expect(messageServiceSpy.error).toHaveBeenCalledWith('Failed to send request. Please try again later.');
    expect(console.error).toHaveBeenCalled();
    expect(fixture.componentInstance['isNewToolFormSubmitting']).toBe(false);
  });

  it('should compute an error message for an invalid field', () => {
    fixture.componentInstance['newToolFormGroup'].controls.name.markAsDirty();
    fixture.componentInstance['newToolFormGroup'].controls.name.updateValueAndValidity();

    expect(fixture.componentInstance.newToolFormErrorMessages.name).toBe('Name is required.');
  });
});
