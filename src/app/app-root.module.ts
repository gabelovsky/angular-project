import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRootComponent } from './app-root.component';
import { BrowserModule } from '@angular/platform-browser';
import { WeatherPageModule } from './weather-page/weather-page.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    WeatherPageModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent],
})
export class AppModule {}
