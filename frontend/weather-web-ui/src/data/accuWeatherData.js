import React from 'react';

export const accuWeatherData5Days = {
    Headline: {
        EffectiveDate: '2023-02-10T01:00:00+07:00',
        EffectiveEpochDate: 1675965600,
        Severity: 4,
        Text: 'Expect showery weather late Thursday night through Friday morning',
        Category: 'rain',
        EndDate: '2023-02-10T13:00:00+07:00',
        EndEpochDate: 1676008800,
        MobileLink: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?lang=en-us',
    },
    DailyForecasts: [
        {
            Date: '2023-02-05T07:00:00+07:00',
            EpochDate: 1675555200,
            Temperature: {
                Minimum: {
                    Value: 66.0,
                    Unit: 'F',
                    UnitType: 18,
                },
                Maximum: {
                    Value: 73.0,
                    Unit: 'F',
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 18,
                IconPhrase: 'Rain',
                HasPrecipitation: true,
                PrecipitationType: 'Rain',
                PrecipitationIntensity: 'Light',
            },
            Night: {
                Icon: 8,
                IconPhrase: 'Dreary',
                HasPrecipitation: false,
            },
            Sources: ['AccuWeather'],
            MobileLink: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?day=1&lang=en-us',
            Link: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?day=1&lang=en-us',
        },
        {
            Date: '2023-02-06T07:00:00+07:00',
            EpochDate: 1675641600,
            Temperature: {
                Minimum: {
                    Value: 67.0,
                    Unit: 'F',
                    UnitType: 18,
                },
                Maximum: {
                    Value: 76.0,
                    Unit: 'F',
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 7,
                IconPhrase: 'Cloudy',
                HasPrecipitation: true,
                PrecipitationType: 'Rain',
                PrecipitationIntensity: 'Light',
            },
            Night: {
                Icon: 12,
                IconPhrase: 'Showers',
                HasPrecipitation: true,
                PrecipitationType: 'Rain',
                PrecipitationIntensity: 'Light',
            },
            Sources: ['AccuWeather'],
            MobileLink: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?day=2&lang=en-us',
            Link: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?day=2&lang=en-us',
        },
        {
            Date: '2023-02-07T07:00:00+07:00',
            EpochDate: 1675728000,
            Temperature: {
                Minimum: {
                    Value: 67.0,
                    Unit: 'F',
                    UnitType: 18,
                },
                Maximum: {
                    Value: 74.0,
                    Unit: 'F',
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 12,
                IconPhrase: 'Showers',
                HasPrecipitation: true,
                PrecipitationType: 'Rain',
                PrecipitationIntensity: 'Light',
            },
            Night: {
                Icon: 12,
                IconPhrase: 'Showers',
                HasPrecipitation: true,
                PrecipitationType: 'Rain',
                PrecipitationIntensity: 'Light',
            },
            Sources: ['AccuWeather'],
            MobileLink: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?day=3&lang=en-us',
            Link: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?day=3&lang=en-us',
        },
        {
            Date: '2023-02-08T07:00:00+07:00',
            EpochDate: 1675814400,
            Temperature: {
                Minimum: {
                    Value: 66.0,
                    Unit: 'F',
                    UnitType: 18,
                },
                Maximum: {
                    Value: 73.0,
                    Unit: 'F',
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 8,
                IconPhrase: 'Dreary',
                HasPrecipitation: true,
                PrecipitationType: 'Rain',
                PrecipitationIntensity: 'Light',
            },
            Night: {
                Icon: 12,
                IconPhrase: 'Showers',
                HasPrecipitation: true,
                PrecipitationType: 'Rain',
                PrecipitationIntensity: 'Light',
            },
            Sources: ['AccuWeather'],
            MobileLink: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?day=4&lang=en-us',
            Link: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?day=4&lang=en-us',
        },
        {
            Date: '2023-02-09T07:00:00+07:00',
            EpochDate: 1675900800,
            Temperature: {
                Minimum: {
                    Value: 66.0,
                    Unit: 'F',
                    UnitType: 18,
                },
                Maximum: {
                    Value: 74.0,
                    Unit: 'F',
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 4,
                IconPhrase: 'Intermittent clouds',
                HasPrecipitation: true,
                PrecipitationType: 'Rain',
                PrecipitationIntensity: 'Light',
            },
            Night: {
                Icon: 12,
                IconPhrase: 'Showers',
                HasPrecipitation: true,
                PrecipitationType: 'Rain',
                PrecipitationIntensity: 'Moderate',
            },
            Sources: ['AccuWeather'],
            MobileLink: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?day=5&lang=en-us',
            Link: 'http://www.accuweather.com/en/vn/hanoi/353412/daily-weather-forecast/353412?day=5&lang=en-us',
        },
    ],
};

function transformDegFtoDegC(value) {
    const transformedValue = ((value - 32) * 5) / 9;
    return transformedValue;
}

function transformedAccuWeather5DaysFunc() {
    const transformedDays = [];
    const transformedTemperaturesdegF = [];
    const transformedTemperaturesdegC = [];
    accuWeatherData5Days.DailyForecasts.map((DailyForecast) => {
        transformedDays.push(DailyForecast.Date.slice(0, 10));
        transformedTemperaturesdegF.push(DailyForecast.Temperature.Maximum.Value);
        transformedTemperaturesdegC.push(transformDegFtoDegC(DailyForecast.Temperature.Maximum.Value));
    });
    return {
        transformedDays,
        transformedTemperaturesdegF,
        transformedTemperaturesdegC,
    };
}

export const transformedAccuWeather5DaysData = transformedAccuWeather5DaysFunc();

export const accuWeatherData12Hours = [
    {
        DateTime: '2023-02-05T23:00:00+07:00',
        EpochDateTime: 1675612800,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: false,
        Temperature: {
            Value: 68.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 9,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=1&hbhhour=23&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=1&hbhhour=23&lang=en-us',
    },
    {
        DateTime: '2023-02-06T00:00:00+07:00',
        EpochDateTime: 1675616400,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: false,
        Temperature: {
            Value: 68.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 9,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=0&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=0&lang=en-us',
    },
    {
        DateTime: '2023-02-06T01:00:00+07:00',
        EpochDateTime: 1675620000,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: false,
        Temperature: {
            Value: 68.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 7,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=1&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=1&lang=en-us',
    },
    {
        DateTime: '2023-02-06T02:00:00+07:00',
        EpochDateTime: 1675623600,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: false,
        Temperature: {
            Value: 68.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 7,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=2&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=2&lang=en-us',
    },
    {
        DateTime: '2023-02-06T03:00:00+07:00',
        EpochDateTime: 1675627200,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: false,
        Temperature: {
            Value: 67.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 6,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=3&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=3&lang=en-us',
    },
    {
        DateTime: '2023-02-06T04:00:00+07:00',
        EpochDateTime: 1675630800,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: false,
        Temperature: {
            Value: 67.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 5,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=4&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=4&lang=en-us',
    },
    {
        DateTime: '2023-02-06T05:00:00+07:00',
        EpochDateTime: 1675634400,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: false,
        Temperature: {
            Value: 67.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 5,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=5&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=5&lang=en-us',
    },
    {
        DateTime: '2023-02-06T06:00:00+07:00',
        EpochDateTime: 1675638000,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: false,
        Temperature: {
            Value: 66.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 8,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=6&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=6&lang=en-us',
    },
    {
        DateTime: '2023-02-06T07:00:00+07:00',
        EpochDateTime: 1675641600,
        WeatherIcon: 12,
        IconPhrase: 'Showers',
        HasPrecipitation: true,
        PrecipitationType: 'Rain',
        PrecipitationIntensity: 'Light',
        IsDaylight: true,
        Temperature: {
            Value: 67.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 51,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=7&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=7&lang=en-us',
    },
    {
        DateTime: '2023-02-06T08:00:00+07:00',
        EpochDateTime: 1675645200,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: true,
        Temperature: {
            Value: 67.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 47,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=8&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=8&lang=en-us',
    },
    {
        DateTime: '2023-02-06T09:00:00+07:00',
        EpochDateTime: 1675648800,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: true,
        Temperature: {
            Value: 69.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 35,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=9&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=9&lang=en-us',
    },
    {
        DateTime: '2023-02-06T10:00:00+07:00',
        EpochDateTime: 1675652400,
        WeatherIcon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
        IsDaylight: true,
        Temperature: {
            Value: 69.0,
            Unit: 'F',
            UnitType: 18,
        },
        PrecipitationProbability: 19,
        MobileLink:
            'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=10&lang=en-us',
        Link: 'http://www.accuweather.com/en/vn/hanoi/353412/hourly-weather-forecast/353412?day=2&hbhhour=10&lang=en-us',
    },
];

function transformedAccuWeather12HoursFunc() {
    const transformedDays = [];
    const transformedTemperaturesdegF = [];
    const transformedTemperaturesdegC = [];

    accuWeatherData12Hours.map((oneHourData) => {
        transformedDays.push(oneHourData.DateTime.slice(11, 19));
        transformedTemperaturesdegF.push(oneHourData.Temperature.Value);
        transformedTemperaturesdegC.push(transformDegFtoDegC(oneHourData.Temperature.Value));
    });
    return {
        transformedDays,
        transformedTemperaturesdegF,
        transformedTemperaturesdegC,
    };
}

export const transformedAccuWeather12HoursData = transformedAccuWeather12HoursFunc();

function accuWeatherData() {
    return <div>accuWeatherData</div>;
}

export default accuWeatherData;
