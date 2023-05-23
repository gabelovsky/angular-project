import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { COUNTY_CODES } from '../country-code.constants';
import { MessageTypes } from '../weather-page.constants';

export class WeatherInputForm {
  form: FormGroup;

  airportPattern = /^[A-Z]{4}$/;
  constructor() {
    this.form = this.initForm();
  }

  /**
   * Initializes form controls
   *
   * @returns The input form object
   */
  initForm(): FormGroup {
    let formGroup = new FormGroup({
      checkboxes: new FormGroup({}, { validators: [this.atLeastOneValid()] }),
      inputFields: new FormGroup(
        {
          airportInput: new FormControl<string>('', {
            validators: [this.airportValidator()],
          }),
          countryInput: new FormControl<string>('', {
            validators: [this.countryValidator()],
          }),
        },
        { validators: [this.atLeastOneValid()] }
      ),
    });

    for (const key in MessageTypes) {
      formGroup.controls.checkboxes.addControl(
        key,
        new FormControl<boolean>(false)
      );
    }

    return formGroup;
  }

  /**
   * Gets the control of the checkboxes from the form
   *
   * @param checkboxId - id of the checkbox or empty
   *
   * @returns Checkbox control if checkboxId is specified,
   *  checkbox group control if not
   */
  getCheckboxControl(checkboxId?: string): FormControl {
    return checkboxId
      ? (this.form?.get('checkboxes')?.get(checkboxId) as FormControl)
      : (this.form?.get('checkboxes') as FormControl);
  }

  /**
   * Gets the control of the input fields from the form
   *
   * @param fieldName - name of the input field or empty
   *
   * @returns Input field control if fieldName is specified,
   *  input group control if not
   */
  getInputFieldControl(fieldName?: string): FormControl {
    return fieldName
      ? (this.form?.get('inputFields')?.get(fieldName) as FormControl)
      : (this.form?.get('inputFields') as FormControl);
  }

  /**
   * Checks if at least one control has a value in a form group
   *
   * @returns Validator function
   */
  private atLeastOneValid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let group = control as FormGroup;
      const atLeastOneTruthy =
        group &&
        group.controls &&
        Object.values(group.controls).some((value) => value.value);
      return atLeastOneTruthy ? null : { atLeastOneError: true };
    };
  }

  /**
   * Checks if the airport codes are in the correct format
   *
   * @returns Validator function
   */
  private airportValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let airportArray = control.value.replace(/  +/g, ' ').trim().split(' ');
      let airportMatches = airportArray.every((airport: string) =>
        airport.trim().match(this.airportPattern)
      );
      return airportMatches || !airportArray[0]
        ? null
        : { airportFormatError: true };
    };
  }

  /**
   * Checks if the country codes are included in the country list
   *
   * @returns Validator function
   */
  private countryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let countryArray = control.value.replace(/  +/g, ' ').trim().split(' ');
      let countryMatches = countryArray.every((country: string) =>
        COUNTY_CODES.includes(country)
      );
      return countryMatches || !countryArray[0]
        ? null
        : { countryFormatError: true };
    };
  }
}
