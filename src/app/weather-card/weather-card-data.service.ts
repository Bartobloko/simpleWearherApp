import { Injectable } from '@angular/core';
import { WholeWeatherData } from '../shared/interfaces/whole-weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherCardDataService {

  constructor() { }

  static getHourlyData(res: WholeWeatherData) {
    const {
      time,
      temperature_2m,
      apparent_temperature,
      cloud_cover,
      precipitation_probability,
      relative_humidity_2m,
      surface_pressure,
      uv_index,
      visibility,
      weather_code
    } = res.hourly;

    const utcDifferenceInHours = (res.utc_offset_seconds / 60) / 60;

    const weatherCodeToIcon: { [key: number]: string } = {
      0: 'sunny.svg',
      1: 'cloudy.svg',
      2: 'cloudy.svg',
      3: 'completelyCloudy.svg',
      45:'foggy.svg',
      48:'foggy.svg',
      51:'rainy.svg',
      53:'rainy.svg',
      55:'rainy.svg',
      56:'rainy.svg',
      57:'rainy.svg',
      61:'rainy.svg',
      63:'rainy.svg',
      65:'rainy.svg',
      66:'rainy.svg',
      67:'rainy.svg',
      80:'rainy.svg',
      81:'rainy.svg',
      82:'rainy.svg',
      71:'snowy.svg',
      73:'snowy.svg',
      75:'snowy.svg',
      85:'snowy.svg',
      86:'snowy.svg',
      77:'hail.svg',
      95:'thunderstorm.svg',
      96:'thunderstormWithRain.svg',
      99:'thunderstormWithRain.svg',

    };

    return time.map((timestamp: string, index: number) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      const formattedDate = `${day}-${month}-${year}`;
      const formattedHour = `${hours}:${minutes}`;

      const icon = weatherCodeToIcon[weather_code[index]] || 'default.svg';

      return {
        date: formattedDate,
        formattedHour,
        utcDifferenceInHours,
        temperature: temperature_2m[index],
        apparent_temperature: apparent_temperature[index],
        cloud_cover: cloud_cover[index],
        precipitation_probability: precipitation_probability[index],
        relative_humidity_2m: relative_humidity_2m[index],
        surface_pressure: surface_pressure[index],
        uv_index: uv_index[index],
        visibility: visibility[index],
        weather_code: weather_code[index],
        icon
      };
    });
  }

  static convertDateToUTC(date: Date): Date {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  }

  static findCurrentTimeIndex(res: WholeWeatherData): number {
    const { time } = res.hourly;
    const offsetSeconds = res.utc_offset_seconds;
    const offsetMilliseconds = offsetSeconds * 1000;
    
    const currentUtcDate = WeatherCardDataService.convertDateToUTC(new Date());

    const targetTimezoneDate = new Date(currentUtcDate.getTime() + offsetMilliseconds);

    const targetTimezoneDateRounded = new Date(Math.round(targetTimezoneDate.getTime() / 3600000) * 3600000);

    const roundedTimeISO = `${targetTimezoneDateRounded.getFullYear()}-${String(targetTimezoneDateRounded.getMonth() + 1).padStart(2, '0')}-${String(targetTimezoneDateRounded.getDate()).padStart(2, '0')}T${String(targetTimezoneDateRounded.getHours()).padStart(2, '0')}:00`;

    return time.findIndex((t: string) => t === roundedTimeISO);
  }


}
