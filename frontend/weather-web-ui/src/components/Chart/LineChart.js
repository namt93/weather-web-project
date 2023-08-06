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
import {
    GetWanruWeatherTemp5Days,
    GetWanruWeatherTemp12Hours,
    GetWanruWeather12HoursSCADA,
} from '~/data/wanruWeatherData';

// Reset default ChartJS
ChartJS.defaults.color = '#e6edf3';
ChartJS.defaults.borderColor = '#555';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart({ labels, yTitle, accuData, wanruData = [21, 25, 22, 20, 20] }) {
    const options = {
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
                    text: `${yTitle}`,
                    font: { size: 16 },
                },
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Wanru Weather',
                data: wanruData,
                borderColor: 'blue',
                backgroundColor: 'blue',
                tension: 0.5,
            },
            // {
            //     label: 'accuWeather',
            //     data: accuData,
            //     borderColor: 'orangeRed',
            //     backgroundColor: 'orangeRed',
            //     tension: 0.5,
            // },
        ],
    };

    return <Line data={data} options={options} />;
}

export function ForecastLineChart({ states }) {
    // Get data
    // const transformedAccuWeather5DaysData = GetAccuWeatherTemp5Days();
    // const transformedAccuWeather12HoursData = GetAccuWeatherTemp12Hours();

    // const transformedWanruWeather5DaysData = GetWanruWeatherTemp5Days();
    // const transformedWanruWeather12HoursData = GetWanruWeatherTemp12Hours();

    const displayedWanruWeather12HoursDataSCADA = GetWanruWeather12HoursSCADA();

    const labels = displayedWanruWeather12HoursDataSCADA.timeInterval12Hours;

    var dataWanruToRender;
    if (states.weatherPropertyState == 'Temperature') {
        dataWanruToRender = displayedWanruWeather12HoursDataSCADA.wanruWeatherTemp12Hours;
    } else if (states.weatherPropertyState == 'Wind Speed (m/s)') {
        dataWanruToRender = displayedWanruWeather12HoursDataSCADA.wanruWeatherWindSpeed12Hours;
    } else if (states.weatherPropertyState == 'Visibility') {
        dataWanruToRender = displayedWanruWeather12HoursDataSCADA.wanruWeatherVisibility12Hours;
    } else if (states.weatherPropertyState == 'Rain (mm)') {
        dataWanruToRender = displayedWanruWeather12HoursDataSCADA.wanruWeatherRain12Hours;
    }

    return <LineChart yTitle={states.weatherPropertyState} labels={labels} wanruData={dataWanruToRender} />;
}

export default LineChart;
