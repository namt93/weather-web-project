import React, { useEffect, useState } from 'react';

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

// Get 5 days data
function transformedAccuWeatherTemp5DaysFunc(accuWeatherData5Days) {
    const transformedDays = [];
    const transformedTemperaturesdegF = [];
    const transformedTemperaturesdegC = [];

    accuWeatherData5Days?.DailyForecasts?.map((DailyForecast) => {
        transformedDays.push(DailyForecast?.Date?.slice(0, 10));
        transformedTemperaturesdegF.push(DailyForecast?.Temperature.Maximum.Value);
        transformedTemperaturesdegC.push(transformDegFtoDegC(DailyForecast?.Temperature.Maximum.Value));
    });
    return {
        transformedDays,
        transformedTemperaturesdegF,
        transformedTemperaturesdegC,
    };
}

export function GetAccuWeatherTemp5Days() {
    const [record, setRecord] = useState({});
    var accuWeatherData5Days = {};

    useEffect(() => {
        let intervalId = setInterval(() => {
            fetch(
                `http://dataservice.accuweather.com/forecasts/v1/daily/5day/353412?apikey=TmSwoc864G9LQ6Sy1kVpiuwaPCTLN92z`,
            )
                .then((res) => res.json())
                .then((res) => {
                    setRecord(res);
                })
                .catch(() => {
                    console.log('Error fetch AccuWeather 5 days');
                });
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (Object.keys(record) != 0) {
        accuWeatherData5Days = record;
    }
    const transformed5DaysData = transformedAccuWeatherTemp5DaysFunc(accuWeatherData5Days);

    return transformed5DaysData;
}

// Get 12 hours data
function transformedAccuWeatherTemp12HoursFunc(accuWeatherData12Hours) {
    const transformedHours = [];
    const transformedTemperaturesdegF = [];
    const transformedTemperaturesdegC = [];

    accuWeatherData12Hours?.map((HourForecast) => {
        transformedHours.push(HourForecast?.DateTime?.slice(11, 19));
        transformedTemperaturesdegF.push(HourForecast?.Temperature.Value);
        transformedTemperaturesdegC.push(transformDegFtoDegC(HourForecast?.Temperature.Value));
    });
    return {
        transformedHours,
        transformedTemperaturesdegF,
        transformedTemperaturesdegC,
    };
}

export function GetAccuWeatherTemp12Hours() {
    const [record, setRecord] = useState({});

    useEffect(() => {
        let intervalId = setInterval(() => {
            fetch(
                `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/353412?apikey=TmSwoc864G9LQ6Sy1kVpiuwaPCTLN92z`,
            )
                .then((res) => res.json())
                .then((res) => {
                    setRecord(res);
                })
                .catch(() => {
                    console.log('Error fetch AccuWeather 12 hours');
                });
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    var transformed12HoursData = {};

    if (Object.keys(record) == 0) {
        transformed12HoursData = transformedAccuWeatherTemp12HoursFunc([]);
    } else {
        transformed12HoursData = transformedAccuWeatherTemp12HoursFunc(record);
    }
    return transformed12HoursData;
}

export function GetAccuWeather12Hours() {
    const [record, setRecord] = useState({});

    useEffect(() => {
        let intervalId = setInterval(() => {
            fetch(
                `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/353412?apikey=TmSwoc864G9LQ6Sy1kVpiuwaPCTLN92z`,
            )
                .then((res) => res.json())
                .then((res) => {
                    setRecord(res);
                })
                .catch(() => {
                    console.log('Error fetch AccuWeather 12 hours');
                });
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return record;
}

function AccuWeatherData() {
    return <div>accuWeatherData</div>;
}

export default AccuWeatherData;
