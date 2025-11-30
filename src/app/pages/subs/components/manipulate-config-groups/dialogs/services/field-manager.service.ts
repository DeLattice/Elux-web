import {Injectable} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FieldManagerService {
  public checkAndAddEmptyField(payloadArray: FormArray): void {
    const controls = payloadArray.controls;
    const lastIndex = controls.length - 1;

    if (lastIndex < 0) {
      payloadArray.push(new FormControl(''));
      return;
    }

    const lastControl = controls[lastIndex];
    const lastValue = lastControl.value;

    if (lastValue && lastControl.valid) {
      const trimmedValue = lastValue.trim();

      if (trimmedValue !== '') {
        payloadArray.push(new FormControl(''));
      }
    }
  }
}
