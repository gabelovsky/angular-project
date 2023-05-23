import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherApiResponse, WeatherTableRow } from '../weather-page.constants';
import { WeatherPageService } from '../weather-page.service';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css'],
})
export class WeatherTableComponent implements OnChanges {
  @Input() weatherApiResponse: WeatherApiResponse;

  weatherTableData: Map<string, WeatherTableRow[]>;
  errorMessage: string | null = '';

  constructor(private weatherPageService: WeatherPageService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.weatherApiResponse?.currentValue) {
      if (this.weatherApiResponse.error) {
        this.errorMessage = this.weatherApiResponse.error.message;
      } else if (this.weatherApiResponse?.result?.length === 0) {
        this.errorMessage = 'No reports found';
      } else {
        this.weatherTableData = this.weatherPageService.parseResponse(
          this.weatherApiResponse
        );
        this.errorMessage = null;
      }
    }
  }
}
