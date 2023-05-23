import { Component, ViewChild } from '@angular/core';
import { WeatherInputComponent } from '../weather-input/weather-input.component';
import { WeatherApiResponse } from '../weather-page.constants';
import { WeatherPageService } from '../weather-page.service';

@Component({
  selector: 'app-weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.css'],
})
export class WeatherContainerComponent {
  constructor(private weatherPageService: WeatherPageService) {}

  @ViewChild(WeatherInputComponent) inputComponent: WeatherInputComponent;

  weatherApiResponse: WeatherApiResponse;

  /**
   * Sends request to laod the weather data or mark the input as invalid
   */
  loadWeatherData(): void {
    if (this.inputComponent.isFormValid()) {
      let payload = this.weatherPageService.preparePayload(
        this.inputComponent.getFormData()
      );
      this.weatherPageService
        .getWeatherReport(payload)
        .subscribe((response) => {
          this.weatherApiResponse = response;
        });
    }
  }
}
