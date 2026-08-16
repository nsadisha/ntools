import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getInputErrorMessage, validateAllFields } from './form.util';

describe('form.util', () => {
  describe('validateAllFields', () => {
    it('should return true and leave controls untouched for a valid group', () => {
      const control = new FormControl('value', [Validators.required]);
      const formGroup = new FormGroup({ field: control });

      expect(validateAllFields(formGroup)).toBe(true);
      expect(control.dirty).toBe(false);
    });

    it('should mark invalid controls as dirty and return false for an invalid group', () => {
      const control = new FormControl('', [Validators.required]);
      const formGroup = new FormGroup({ field: control });

      expect(validateAllFields(formGroup)).toBe(false);
      expect(control.dirty).toBe(true);
    });
  });

  describe('getInputErrorMessage', () => {
    it('should use the supplied control name for a required error', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsDirty();

      expect(getInputErrorMessage(control, 'Name')).toBe('Name is required.');
    });

    it('should default the control name to "This field" when not supplied', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsDirty();

      expect(getInputErrorMessage(control)).toBe('This field is required.');
    });

    it('should return an email-specific message for an email error', () => {
      const control = new FormControl('not-an-email', [Validators.email]);

      expect(getInputErrorMessage(control, 'Email')).toBe('Please enter a valid email.');
    });

    it('should return a maxlength message including the required length', () => {
      const control = new FormControl('too long', [Validators.maxLength(3)]);

      expect(getInputErrorMessage(control, 'Message')).toBe('Message must be less than 3 characters.');
    });

    it('should return a minlength message including the required length', () => {
      const control = new FormControl('ab', [Validators.minLength(3)]);

      expect(getInputErrorMessage(control, 'Message')).toBe('Message must be greater than 3 characters.');
    });

    it('should return a max message including the required value', () => {
      const control = new FormControl(10, [Validators.max(5)]);

      expect(getInputErrorMessage(control)).toBe('Value must be less than 5.');
    });

    it('should return a min message including the required value', () => {
      const control = new FormControl(1, [Validators.min(5)]);

      expect(getInputErrorMessage(control)).toBe('Value must be greater than 5.');
    });

    it('should return an empty string when the control has no errors', () => {
      const control = new FormControl('valid');

      expect(getInputErrorMessage(control)).toBe('');
    });
  });
});
