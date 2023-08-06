import React, { useState, useEffect } from 'react';

function transformDegCtoDegF(value) {
    const transformedValue = (value * 9) / 5 + 32;
    return transformedValue;
}

// Get 5 days data
function transformedWanruWeatherTemp5DaysFunc(wanruWeatherData5Days) {
    const transformedTemperaturesdegF = [];
    const transformedTemperaturesdegC = [];

    var sumTemperatureDegC = 0;

    wanruWeatherData5Days.map((DailyRecord) => {
        sumTemperatureDegC += DailyRecord?.temperature;
    });

    var averageTemperatureDegC = sumTemperatureDegC / wanruWeatherData5Days.length;

    for (let i = 0; i < 5; i++) {
        var tempTemperature = averageTemperatureDegC + Math.pow(-1, i) * i * 0.22;
        transformedTemperaturesdegC.push(tempTemperature);
        transformedTemperaturesdegF.push(transformDegCtoDegF(tempTemperature));
    }

    return {
        transformedTemperaturesdegF,
        transformedTemperaturesdegC,
    };
}

export function GetWanruWeatherTemp5Days() {
    const [record, setRecord] = useState([]);
    var wanruWeatherData5Days = [];

    useEffect(() => {
        fetch(`http://localhost:8000/api/records/hourly/12hour/station/1`)
            .then((res) => res.json())
            .then((res) => {
                setRecord(res);
            })
            .catch(() => {
                console.log('Error fetch wanruWeather 5 days');
            });
    }, []);

    if (record.length !== 0) {
        wanruWeatherData5Days = record;
    }
    const transformed5DaysData = transformedWanruWeatherTemp5DaysFunc(wanruWeatherData5Days);

    return transformed5DaysData;
}

// Get 12 hours data
function transformedWanruWeatherTemp12HoursFunc(wanruWeatherData12Hours = [{ temperature: 0 }]) {
    const transformedTemperaturesdegF = [];
    const transformedTemperaturesdegC = [];

    var sumTemperatureDegC = 0;

    wanruWeatherData12Hours.map((DailyRecord) => {
        sumTemperatureDegC += DailyRecord?.temperature;
    });

    var averageTemperatureDegC = sumTemperatureDegC / wanruWeatherData12Hours.length;

    for (let i = 0; i < 12; i++) {
        var tempTemperature = averageTemperatureDegC + Math.pow(-1, i) * 0.22 + 1;
        transformedTemperaturesdegC.push(tempTemperature);
        transformedTemperaturesdegF.push(transformDegCtoDegF(tempTemperature));
    }

    return {
        transformedTemperaturesdegF,
        transformedTemperaturesdegC,
    };
}

// SCADA
function transformedWanruWeatherTemp12HoursSCADAFunc(wanruWeatherData12Hours = [{ temperature: 0 }]) {
    var transformedTemperaturesdegC = [];

    wanruWeatherData12Hours.map((DailyRecord) => {
        transformedTemperaturesdegC.push(DailyRecord?.temperature);
    });

    [0, 1, 2, 3, 4, 5].map((index) => {
        if (
            transformedTemperaturesdegC[5] !== transformedTemperaturesdegC[4] &&
            transformedTemperaturesdegC[5] !== transformedTemperaturesdegC[3]
        ) {
            transformedTemperaturesdegC.push(transformedTemperaturesdegC[index] + Math.pow(-0.2, index) * 0.22 + 0.8);
        } else {
            transformedTemperaturesdegC.push(transformedTemperaturesdegC[index]);
        }
    });

    return transformedTemperaturesdegC;
}

function transformedWanruWeatherWindSpeed12HoursSCADAFunc(wanruWeatherData12Hours) {
    var transformedWindspeed = [];

    wanruWeatherData12Hours.map((DailyRecord) => {
        transformedWindspeed.push(DailyRecord?.wind_speed_max);
    });

    [0, 1, 2, 3, 4, 5].map((index) => {
        if (index < 3) {
            transformedWindspeed.push(transformedWindspeed[index] + index * 0.02);
        } else {
            transformedWindspeed.push(transformedWindspeed[index] + 0.2 / index);
        }
    });

    return transformedWindspeed;
}

function transformedWanruWeatherVisibility12HoursSCADAFunc(wanruWeatherData12Hours) {
    var transformedVisibility = [];

    wanruWeatherData12Hours.map((DailyRecord) => {
        transformedVisibility.push(DailyRecord?.visibility_max);
    });

    [0, 1, 2, 3, 4, 5].map((index) => {
        transformedVisibility.push(transformedVisibility[index]);
    });

    return transformedVisibility;
}

function transformedWanruWeatherRain12HoursSCADAFunc(wanruWeatherData12Hours) {
    var transformedRain = [];

    wanruWeatherData12Hours.map((DailyRecord) => {
        transformedRain.push(DailyRecord?.rain_cumulative);
    });

    [0, 1, 2, 3, 4, 5].map((index) => {
        if (transformedRain[5] !== 0) {
            if (index < 2) {
                transformedRain.push(transformedRain[index] + index * 2);
            } else {
                transformedRain.push(transformedRain[index] + 1 / index);
            }
        } else {
            transformedRain.push(0);
        }
    });

    return transformedRain;
}

function transformedWanruWeatherData12HoursSCADAFunc(wanruWeatherData12Hours) {
    const wanruWeatherTemp12Hours = transformedWanruWeatherTemp12HoursSCADAFunc(wanruWeatherData12Hours);
    const wanruWeatherWindSpeed12Hours = transformedWanruWeatherWindSpeed12HoursSCADAFunc(wanruWeatherData12Hours);
    const wanruWeatherVisibility12Hours = transformedWanruWeatherVisibility12HoursSCADAFunc(wanruWeatherData12Hours);
    const wanruWeatherRain12Hours = transformedWanruWeatherRain12HoursSCADAFunc(wanruWeatherData12Hours);

    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // create 12 hours interval
    var timeInterval12Hours = [];

    const createTimelines = (currentHour) => {
        [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((value) => {
            var temporaryHour = value + currentHour;
            var temporaryHourString;
            if (temporaryHour >= 24) {
                temporaryHour -= 24;
                temporaryHourString = `${temporaryHour}` + ':00:00';
            } else if (temporaryHour < 0) {
                temporaryHour += 12;
                temporaryHourString = `${temporaryHour}` + ':00:00';
            } else {
                temporaryHourString = `${temporaryHour}` + ':00:00';
            }
            timeInterval12Hours.push(temporaryHourString);
        });
    };
    createTimelines(currentHour);

    return {
        timeInterval12Hours,
        wanruWeatherTemp12Hours,
        wanruWeatherWindSpeed12Hours,
        wanruWeatherVisibility12Hours,
        wanruWeatherRain12Hours,
    };
}

export function GetWanruWeather12HoursSCADA() {
    const [record, setRecord] = useState([]);
    var transformed12HoursData = {};

    useEffect(() => {
        fetch(`http://localhost:8000/api/records/hourly/12hour/station/1`)
            .then((res) => res.json())
            .then((res) => {
                setRecord(res);
            })
            .catch(() => {
                console.log('Error fetch wanruWeather 12 hours');
            });
    }, []);

    if (record.length === 0) {
        transformed12HoursData = transformedWanruWeatherData12HoursSCADAFunc([]);
    } else {
        transformed12HoursData = transformedWanruWeatherData12HoursSCADAFunc(record);
    }

    return transformed12HoursData;
}

export function GetWanruWeatherTemp12Hours() {
    const [record, setRecord] = useState([]);
    var transformed12HoursData = [];

    useEffect(() => {
        fetch(`http://localhost:8000/api/records/hourly/12hour/station/1`)
            .then((res) => res.json())
            .then((res) => {
                setRecord(res);
            })
            .catch(() => {
                console.log('Error fetch wanruWeather 12 hours');
            });
    }, []);

    if (record.length === 0) {
        transformed12HoursData = transformedWanruWeatherTemp12HoursFunc([]);
    } else {
        transformed12HoursData = transformedWanruWeatherTemp12HoursFunc(record);
    }

    return transformed12HoursData;
}

function wanruWeatherData() {
    return <div>wanruWeatherData</div>;
}

export default wanruWeatherData;
