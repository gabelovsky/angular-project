import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherContainerComponent } from './weather-container/weather-container.component';
import { WeatherInputComponent } from './weather-input/weather-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherTableComponent } from './weather-table/weather-table.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    WeatherContainerComponent,
    WeatherInputComponent,
    WeatherTableComponent,
  ],
  exports: [WeatherContainerComponent],
})
export class WeatherPageModule {}
