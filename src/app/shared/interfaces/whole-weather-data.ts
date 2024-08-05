import { HourlyWeatherData } from './hourly-weather-data';
import { Units } from './units';
export interface WholeWeatherData {
    elevation: number,
    generationtime_ms: number,
    hourly: HourlyWeatherData,
    hourly_units: Units,
    latitude: number,
    longitude: number,
    timezone: string,
    timezone_abbreviation: string,
    utc_offset_seconds: number,

}
