import {
    faCaretDown,
    faCloudRain,
    faCloudShowersHeavy,
    faDroplet,
    faTemperature2,
    faWater,
    faWind,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import SemiCircleProgress from 'react-progressbar-semicircle';

import styles from './Dashboard.module.scss';
import ProgressBar from '~/components/Bar/ProgressBar';
import SegmentedProgressBar from '~/components/Bar/SegmentedProgressBar';
import { ForecastLineChart } from '~/components/Chart/LineChart';
import Menu from '~/components/Popper/Menu';
import Sidebar, { SidebarRight } from '~/components/Layout/DefaultLayout/Sidebar';
import WindCompass from '~/components/WindCompass';

const cx = classNames.bind(styles);

// const of weather
// const humStates = ['dry', 'normal', 'wet'];
// const chanseRainStates = ['0-25%', '26-50%', '51-75%', '76-100%'];
const tempStates = ['cold', 'normal', 'hot'];
const rainCumulativeStates = ['0-7mm', '8-25mm', '26-50mm', '51-100mm'];

const tempStopNumbers = [10, 30, 45];
// const humStopNumbers = [30, 60, 100];
// const chanseRainStopNumbers = [25, 50, 75, 100];
const rainCumulativeStopNumbers = [7, 25, 50, 100];

// const of forecast
const TEMPERATURE_UNITS = [
    { type: 'degree', title: 'C' },
    { type: 'degree', title: 'F' },
];
const TIME_INTERVALS = [{ title: '5 days' }, { title: '12 hours' }];

const WEATHER_PROPERTIES = [
    { title: 'Temperature' },
    { title: 'Wind Speed (m/s)' },
    { title: 'Visibility' },
    { title: 'Rain (mm)' },
];

function Dashboard() {
    const [record, setRecord] = useState({});
    const [weatherPropertyState, setWeatherPropertyState] = useState('Temperature');
    const [intervalState, setIntervalState] = useState('5 days');

    var lineChartState = {
        weatherPropertyState,
        intervalState,
    };

    // Get lastest record of station
    const getRecord = () => {
        fetch(`http://localhost:8000/api/records/latest/station/1`)
            .then((res) => res.json())
            .then((res) => {
                setRecord(res);
            })
            .catch(() => {
                console.log('Error fetch');
            });
    };

    // Every 3s
    useEffect(() => {
        const timerId = setInterval(() => {
            getRecord();
        }, 3000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    // calc currState of weather
    const calculateStateProperty = (value, stopNumbers, states) => {
        var currentState = '';
        stopNumbers.map((stopNumber, index) => {
            if (value <= stopNumber && currentState == '') {
                currentState = states[index];
            }
        });
        return currentState;
    };

    const visbilityComplete = record?.visibility_max / 10;

    const temperatureState = calculateStateProperty(record.temperature, tempStopNumbers, tempStates);
    // const visbilityState = calculateStateProperty(record.visbility, humStopNumbers, humStates);

    return (
        <div className={cx('wrapper', 'row')}>
            <div className={cx('col-sm-2')}>
                <Sidebar sidebarColor="#121010" />
            </div>

            <div className={cx('display-record', 'col-sm-8')}>
                {/* Details of today's weather section */}
                <h2 className={cx('today-details--title')}>Hai Van Station</h2>
                <div className={cx('property-container')}>
                    <div className={(cx('details-property'), cx('grid-item'))}>
                        <div className={cx('property-content')}>
                            <div className={cx('property-name')}>
                                <div className={cx('property-title')}>Wind Speed</div>

                                <i className={cx('property-icon')}>
                                    <FontAwesomeIcon icon={faWind} />
                                </i>
                            </div>
                            <div className={cx('wind-display')}>
                                <div className={cx('wind-speed-display')}>
                                    <SemiCircleProgress
                                        stroke={'blue'}
                                        percentage={record.wind_speed_max ? record.wind_speed_max : 15}
                                        diameter={160}
                                    />
                                </div>
                                <div className={cx('wind-direction')}>
                                    <WindCompass value={record.wind_direction_at_max} />
                                </div>
                            </div>
                            <div className={cx('property-value', 'wind-speed-value')}>
                                <div>{record.wind_speed_max ? record.wind_speed_max : 15}m/s</div>
                            </div>
                        </div>
                    </div>
                    <div className={(cx('details-property'), cx('grid-item'))}>
                        <div className={cx('property-content')}>
                            <div className={cx('property-name')}>
                                <div className={cx('property-title')}>Temperature</div>

                                <i className={cx('property-icon')}>
                                    <FontAwesomeIcon icon={faTemperature2} />
                                </i>
                            </div>
                            <div className={cx('property-value')}>
                                <h2>{record.temperature ? record.temperature : 30}&deg;C</h2>
                                <div className={cx('property-state')}>
                                    {temperatureState ? temperatureState : 'normal'}
                                </div>
                            </div>
                            <div className={cx('property-display')}>
                                <SegmentedProgressBar
                                    completed={record.temperature ? record.temperature : 30}
                                    stopNumbers={tempStopNumbers}
                                    colors={['rgb(0,150,1)', 'rgb(210,210,0)', 'rgb(200, 100, 20)']}
                                    states={tempStates}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={(cx('details-property'), cx('grid-item'))}>
                        <div className={cx('property-content')}>
                            <div className={cx('property-name')}>
                                <div className={cx('property-title')}>Visibility</div>

                                <i className={cx('property-icon')}>
                                    <FontAwesomeIcon icon={faWater} />
                                </i>
                            </div>
                            <div className={cx('visibility-value')}>
                                <h2>{!!record.visibility_max ? record.visibility_max : 1000}m</h2>
                                <h4 className={cx('visibility-min-value')}>
                                    {!!record.visibility_min ? record.visibility_min : 20}m
                                </h4>
                            </div>
                            <div className={cx('visibility-display')}>
                                <ProgressBar completed={visbilityComplete ? visbilityComplete : 98} color="blue" />
                            </div>
                        </div>
                    </div>
                    <div className={(cx('details-property'), cx('grid-item'))}>
                        <div className={cx('property-content')}>
                            <div className={cx('property-name')}>
                                <div className={cx('property-title')}>Rain</div>

                                <i className={cx('property-icon')}>
                                    <FontAwesomeIcon icon={faCloudRain} />
                                </i>
                            </div>
                            <div className={cx('property-value')}>
                                <h2>{record.rain_per_min ? record.rain_per_min : 0}mm</h2>
                                <h4 className={cx('rain-cumulative-value')}>
                                    {record.rain_cumulative ? record.rain_cumulative : 0}mm
                                </h4>
                            </div>
                            <div className={cx('property-display')}>
                                <SegmentedProgressBar
                                    completed={record.rain_cumulative}
                                    stopNumbers={rainCumulativeStopNumbers}
                                    colors={['blue', 'blue', 'blue', 'blue']}
                                    states={rainCumulativeStates}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weather forecast section */}
                <div className={cx('today-details--title')}>Weather Analysis</div>
                <div className={cx('weather-forecast')}>
                    <div className={cx('weather-forecast-actions')}>
                        <div>
                            <Menu
                                items={WEATHER_PROPERTIES}
                                sizeList="size-list-small-2"
                                onChange={setWeatherPropertyState}
                            >
                                <button className={cx('forecast-actions-item')}>
                                    <div className={cx('forecast-actions-item-title')}>{weatherPropertyState}</div>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </button>
                            </Menu>
                        </div>
                        <div>
                            <Menu items={TIME_INTERVALS} sizeList="size-list-small" onChange={setIntervalState}>
                                <button className={cx('forecast-actions-item')}>
                                    <div className={cx('forecast-actions-item-title')}>{intervalState}</div>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </button>
                            </Menu>
                        </div>
                    </div>
                    <ForecastLineChart states={lineChartState} />
                </div>
            </div>

            <div className={cx('col-sm-2')}>
                <SidebarRight sidebarColor="#121010" tempDisplay={record.temperature}></SidebarRight>
            </div>
        </div>
    );
}

export default Dashboard;
