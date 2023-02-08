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
                text: 'Days',
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

function LineChart({ labels, data }) {
    return (
        <Line
            data={{
                labels,
                datasets: [
                    {
                        label: 'Wanru Weather',
                        data: [21, 25, 22, 20, 20],
                        borderColor: 'blue',
                        backgroundColor: 'blue',
                        tension: 0.5,
                    },
                    {
                        label: 'accuWeather',
                        data: data,
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

    const dataToRender =
        states.intervalState == '5 days' ? transformedAccuWeather5DaysData : transformedAccuWeather12HoursData;
    const labels = states.intervalState == '5 days' ? dataToRender.transformedDays : dataToRender.transformedHours;
    const dataToRenderInUnit =
        states.tempUnitState == 'C'
            ? dataToRender.transformedTemperaturesdegC
            : dataToRender.transformedTemperaturesdegF;

    return <LineChart labels={labels} data={dataToRenderInUnit} />;
}

export default LineChart;
