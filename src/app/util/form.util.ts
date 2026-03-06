import {FormControl, FormGroup} from "@angular/forms";

export function validateAllFields(formGroup: FormGroup): boolean {
  if (!formGroup.valid) {
    Object.values(formGroup.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  return formGroup.valid;
}

export function getInputErrorMessage(formControl: FormControl, controlName?: string): string {

  if(controlName === undefined || controlName === null){
    controlName = "This field";
  }

  if (formControl.hasError('required')) {
    return controlName + " is required.";
  }

  if(formControl.hasError('email')){
    return "Please enter a valid email.";
  }

  if (formControl.hasError('maxlength')) {
    const requiredValue = formControl.getError('maxlength').requiredLength;
    return controlName + " must be less than " + requiredValue + " characters.";
  }

  if (formControl.hasError('minlength')) {
    const requiredValue = formControl.getError('minlength').requiredLength;
    return controlName + " must be greater than " + requiredValue + " characters.";
  }

  if (formControl.hasError('max')) {
    const requiredValue = formControl.getError('max').max;
    return "Value must be less than " + requiredValue + ".";
  }

  if (formControl.hasError('min')) {
    const requiredValue = formControl.getError('min').min;
    return "Value must be greater than " + requiredValue + ".";
  }

  return "";
}
