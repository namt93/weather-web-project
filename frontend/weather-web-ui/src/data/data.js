import { GetAccuWeatherTemp5Days } from './accuWeatherData';
import { GetWanruWeatherTemp5Days } from './wanruWeatherData';

export function GetWeatherTemp5Days() {
    let wanruData = GetWanruWeatherTemp5Days();
    let accuData = GetAccuWeatherTemp5Days();

    wanruData?.transformedTemperaturesdegC.concat(accuData?.transformedTemperaturesdegC);
    console.log(wanruData);

    return { temperature: wanruData };
}
