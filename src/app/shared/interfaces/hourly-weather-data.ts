
export interface HourlyWeatherData {
    apparent_temperature: number[],
    cloud_cover: number[],
    precipitation_probability: number[],
    relative_humidity_2m: number[],
    surface_pressure: number[],
    temperature_2m: number[],
    time: string[],
    uv_index: number[],
    visibility: number[],
    weather_code: number[],
}

export interface HourlyWeatherDataConverted {
    date: string;                     
    formattedHour: string;            
    utcDifferenceInHours: number;     
    temperature: number;              
    apparent_temperature: number;     
    cloud_cover: number;              
    precipitation_probability: number;
    relative_humidity_2m: number;    
    surface_pressure: number;        
    uv_index: number;                 
    visibility: number;              
    weather_code: number;
    icon:string
}
