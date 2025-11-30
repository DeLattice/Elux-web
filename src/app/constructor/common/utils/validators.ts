import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const URL_REGEX = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

export const urlValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const urlPattern = new RegExp(URL_REGEX);

  if (control.value === '' || urlPattern.test(control.value)) {
    return null;
  } else {
    return {invalidUrl: true};
  }
};


