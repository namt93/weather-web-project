import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { GetAccuWeatherTemp5Days, GetAccuWeatherTemp12Hours } from '~/data/accuWeatherData';
import { GetWanruWeatherTemp5Days, GetWanruWeatherTemp12Hours } from '~/data/wanruWeatherData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Line Chart',
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            title: {
                display: true,
                text: 'Time',
                font: { size: 16 },
            },
        },
        y: {
            grid: {
                display: true,
            },
            title: {
                display: true,
                text: `Temperature`,
                font: { size: 16 },
            },
        },
    },
};

function LineChart({ labels, accuData, wanruData = [21, 25, 22, 20, 20] }) {
    return (
        <Line
            data={{
                labels,
                datasets: [
                    {
                        label: 'Wanru Weather',
                        data: wanruData,
                        borderColor: 'blue',
                        backgroundColor: 'blue',
                        tension: 0.5,
                    },
                    {
                        label: 'accuWeather',
                        data: accuData,
                        borderColor: 'orangeRed',
                        backgroundColor: 'orangeRed',
                        tension: 0.5,
                    },
                ],
            }}
            options={options}
        />
    );
}

export function ForecastLineChart({ states }) {
    // Get data
    const transformedAccuWeather5DaysData = GetAccuWeatherTemp5Days();
    const transformedAccuWeather12HoursData = GetAccuWeatherTemp12Hours();

    const transformedWanruWeather5DaysData = GetWanruWeatherTemp5Days();
    const transformedWanruWeather12HoursData = GetWanruWeatherTemp12Hours();

    // Convert time interval and degree of LineChart
    const dataAccuToRender =
        states.intervalState == '5 days' ? transformedAccuWeather5DaysData : transformedAccuWeather12HoursData;
    const labels =
        states.intervalState == '5 days' ? dataAccuToRender.transformedDays : dataAccuToRender.transformedHours;
    const dataAccuToRenderInUnit =
        states.tempUnitState == 'C'
            ? dataAccuToRender.transformedTemperaturesdegC
            : dataAccuToRender.transformedTemperaturesdegF;

    const dataWanruToRender =
        states.intervalState == '5 days' ? transformedWanruWeather5DaysData : transformedWanruWeather12HoursData;
    const dataWanruToRenderInUnit =
        states.tempUnitState == 'C'
            ? dataWanruToRender.transformedTemperaturesdegC
            : dataWanruToRender.transformedTemperaturesdegF;

    return <LineChart labels={labels} accuData={dataAccuToRenderInUnit} wanruData={dataWanruToRenderInUnit} />;
}

export default LineChart;
