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
        fetch(`http://localhost:8000/api/records/hourly/12hour/station/9`)
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

export function GetWanruWeatherTemp12Hours() {
    const [record, setRecord] = useState([]);
    var transformed12HoursData = [];

    useEffect(() => {
        fetch(`http://localhost:8000/api/records/hourly/12hour/station/9`)
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
