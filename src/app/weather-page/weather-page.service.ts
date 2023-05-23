import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { HttpMethods } from '../shared/shared.constants';
import {
  MessageType,
  MessageTypes,
  weatherAPI,
  WeatherApiPayload,
  WeatherApiResponse,
  WeatherFormData,
  WeatherTableRow,
} from './weather-page.constants';
import { map } from 'rxjs/operators';

import moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherPageService {
  constructor(private httpService: HttpService) {}

  /**
   * Requests a HTTP request to be send to the weather API
   *
   * @param payload - parsed HTTP POST payload
   *
   * @returns Observable of the HTTP request
   */
  getWeatherReport(payload: WeatherApiPayload): Observable<WeatherApiResponse> {
    return this.httpService
      .request(weatherAPI, HttpMethods.POST, payload)!
      .pipe(
        map((response: WeatherApiResponse) => {
          return response;
        })
      );
  }

  /**
   * Parses the form data into a POST request payload
   * and fills in mandatory fields
   *
   * @param formData - input data from the form
   *
   * @returns HTTP POST payload
   */
  preparePayload(formData: WeatherFormData): WeatherApiPayload {
    let messageTypeList: string[] = [];
    Object.keys(MessageType).forEach((key) => {
      if (formData.checkboxes[key as MessageType]) {
        messageTypeList.push(MessageTypes[key]);
      }
    });
    let countryList = formData.inputFields.countryInput
      ? formData.inputFields.countryInput.replace(/  +/g, ' ').trim().split(' ')
      : null;
    let stationList = formData.inputFields.airportInput
      ? formData.inputFields.airportInput.replace(/  +/g, ' ').trim().split(' ')
      : null;
    return {
      method: 'query',
      id: 'TestID' + Date.now(),
      params: [
        {
          colorize: false,
          reportTypes: messageTypeList,
          ...(countryList && { countries: countryList }),
          ...(stationList && { stations: stationList }),
        },
      ],
    } as WeatherApiPayload;
  }

  /**
   * Parses the result list to be displayed
   *
   * @param response - HTTP request response
   *
   * @returns parsed data mapped by station ID
   */
  parseResponse(response: WeatherApiResponse): Map<string, WeatherTableRow[]> {
    let parsedMap = new Map<string, WeatherTableRow[]>();

    response.result?.map((resultRow) => {
      if (!parsedMap.get(resultRow.stationId)) {
        parsedMap.set(resultRow.stationId, []);
      }
      parsedMap.get(resultRow.stationId)?.push({
        reportType: resultRow.queryType,
        formatedTime: this.parseISOTimeToLocal(resultRow.reportTime),
        reportText: this.setTextColor(resultRow.text),
      });
    });
    return parsedMap;
  }

  /**
   * Parses input timestamp to DD.MM.YYYY HH:mm:ss format
   *
   * @param isoTimestamp - ISO 8601 timestamp
   *
   * @returns the timestamp formated and in local time
   */
  parseISOTimeToLocal(isoTimestamp: string): string {
    return moment.utc(isoTimestamp).local().format('DD.MM.YYYY HH:mm:ss');
  }

  /**
   * Sets the blue or red color in HTML format
   *
   * @param resultText - input string
   *
   * @returns the input string with corresponding HTML tags
   */
  setTextColor(resultText: string): string {
    let greaterPattern =
      /((FEW|BKN|SCT)(03[1-9]|0[4-9]\d|[1-9]\d{2})[a-zA-Z0-9]*)/g;
    let lesserPattern = /((FEW|BKN|SCT)(0[0-2]\d|030)[a-zA-Z0-9]*)/g;
    return resultText
      .replace(greaterPattern, '<span class="red-text">$&</span>')
      .replace(lesserPattern, '<span class="blue-text">$&</span>');
  }
}
