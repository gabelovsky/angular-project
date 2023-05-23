import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpMethods } from './shared.constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}
  /**
   * Sends a generic HTTP request, only POST is used
   *
   * @param url - request url
   * @param requestType - HTTP request type
   * @param payload - POST request payload
   *
   * @returns Observable of the request
   */
  request(url: string, requestType: HttpMethods, payload: Object = {}) {
    if (requestType === HttpMethods.POST) {
      return this.httpClient.post(url, payload);
    }
  }
}
