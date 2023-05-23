export enum MessageType {
  METAR = 'METAR',
  SIGMET = 'SIGMET',
  TAF = 'TAF',
}

export const MessageTypes: Record<string, MessageType> = {
  METAR: MessageType.METAR,
  SIGMET: MessageType.SIGMET,
  TAF: MessageType.TAF,
};

export const weatherAPI = 'https://ogcie.iblsoft.com/ria/opmetquery';

export interface WeatherApiPayload {
  id: string; //id is mandatory
  method: string;
  params: WeatherApiParam[];
}

export interface WeatherApiParam {
  id?: string;
  reportTypes: MessageType[];
  colorize?: boolean;
  countries?: string[];
  places?: string[];
  stations?: string[];
  firs?: string[];
}

export interface WeatherApiResponse {
  id?: string;
  error?: { code: string; data: string; message: string };
  result?: WeatherApiResult[];
}

export interface WeatherApiResult {
  refs?: string[];
  queryType: MessageType;
  reportType: string;
  stationId: string;
  revision?: string;
  placeId?: string;
  text: string;
  textHTML?: string;
  receptionTime?: string;
  reportTime: string;
  validFrom?: string;
  validTo?: string; //incorrect(validEnd) in API specification
}

export interface WeatherTableRow {
  reportType: string;
  formatedTime: string;
  reportText: string;
}

export interface WeatherFormData {
  checkboxes: {
    [key in MessageType]: boolean;
  };
  inputFields: {
    airportInput: string;
    countryInput: string;
  };
}
