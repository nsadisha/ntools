import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportABugComponent } from './report-a-bug.component';
import { overrideAsShallow } from '../../../../testing/shallow';
import { ContactUsApiService } from '../../../../api/contact/contact-us-api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

describe('ReportABugComponent', () => {
  let fixture: ComponentFixture<ReportABugComponent>;
  let contactUsApiServiceSpy: jasmine.SpyObj<ContactUsApiService>;
  let messageServiceSpy: jasmine.SpyObj<NzMessageService>;

  beforeEach(() => {
    contactUsApiServiceSpy = jasmine.createSpyObj<ContactUsApiService>('ContactUsApiService', ['reportBug']);
    messageServiceSpy = jasmine.createSpyObj<NzMessageService>('NzMessageService', ['success', 'error']);

    overrideAsShallow(ReportABugComponent);
    TestBed.configureTestingModule({
      imports: [ReportABugComponent],
      providers: [
        { provide: ContactUsApiService, useValue: contactUsApiServiceSpy },
        { provide: NzMessageService, useValue: messageServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(ReportABugComponent);
    fixture.detectChanges();
  });

  function fillValidForm() {
    fixture.componentInstance['bugReportFormGroup'].setValue({
      name: 'Jane',
      email: 'jane@example.com',
      bugName: 'Crash on save',
      bugUrl: '/tool/plain-text-editor',
      bugDescription: 'Saving crashes the app',
    });
  }

  it('should not submit an invalid form', async () => {
    await fixture.componentInstance['submitBugReportForm']();

    expect(contactUsApiServiceSpy.reportBug).not.toHaveBeenCalled();
    expect(fixture.componentInstance['bugReportFormGroup'].controls.bugName.dirty).toBe(true);
  });

  it('should report the bug and reset the form on success', async () => {
    contactUsApiServiceSpy.reportBug.and.resolveTo({} as any);
    fillValidForm();

    await fixture.componentInstance['submitBugReportForm']();

    expect(contactUsApiServiceSpy.reportBug).toHaveBeenCalledWith({
      name: 'Jane',
      email: 'jane@example.com',
      bug_name: 'Crash on save',
      bug_url: '/tool/plain-text-editor',
      bug_description: 'Saving crashes the app',
    });
    expect(messageServiceSpy.success).toHaveBeenCalledWith('Bug reported successfully!');
    expect(fixture.componentInstance['bugReportFormGroup'].value.bugName).toBeFalsy();
    expect(fixture.componentInstance['isBugReportFormSubmitting']).toBe(false);
  });

  it('should show an error message when reporting fails', async () => {
    spyOn(console, 'error');
    contactUsApiServiceSpy.reportBug.and.rejectWith(new Error('network error'));
    fillValidForm();

    await fixture.componentInstance['submitBugReportForm']();

    expect(messageServiceSpy.error).toHaveBeenCalledWith('Failed to report bug. Please try again later.');
    expect(console.error).toHaveBeenCalled();
    expect(fixture.componentInstance['isBugReportFormSubmitting']).toBe(false);
  });

  it('should compute an error message for an invalid field', () => {
    fixture.componentInstance['bugReportFormGroup'].controls.bugName.markAsDirty();
    fixture.componentInstance['bugReportFormGroup'].controls.bugName.updateValueAndValidity();

    expect(fixture.componentInstance.bugReportFormErrorMessages.bugName).toBe('Bug Name is required.');
  });
});
