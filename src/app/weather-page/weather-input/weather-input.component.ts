import { Component, OnInit } from '@angular/core';
import { WeatherInputForm } from '../weather-input-form/weather-input-form';
import { MessageTypes, WeatherFormData } from '../weather-page.constants';

@Component({
  selector: 'app-weather-input',
  templateUrl: './weather-input.component.html',
  styleUrls: ['./weather-input.component.css'],
})
export class WeatherInputComponent implements OnInit {
  weatherInputForm: WeatherInputForm;
  MessageTypes = MessageTypes;

  constructor() {}

  ngOnInit() {
    this.weatherInputForm = new WeatherInputForm();
  }

  /**
   * Marks the form as touched and returns form validity
   *
   * @returns Validity of the input form
   */
  isFormValid(): boolean {
    this.weatherInputForm.form.markAllAsTouched();
    return this.weatherInputForm.form.valid;
  }

  /**
   * Gets current input form data
   *
   * @returns All values from the form
   */
  getFormData(): WeatherFormData {
    return this.weatherInputForm.form.value;
  }
}
