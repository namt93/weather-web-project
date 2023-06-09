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

const cx = classNames.bind(styles);

// const of weather
const humStates = ['dry', 'normal', 'wet'];
const tempStates = ['cold', 'normal', 'hot'];
const chanseRainStates = ['0-25%', '26-50%', '51-75%', '76-100%'];
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

function Dashboard() {
    const [tempDisplay, setTempDisplay] = useState(0);
    const [record, setRecord] = useState({});
    const [tempUnitState, setTempUnitState] = useState('C');
    const [intervalState, setIntervalState] = useState('5 days');

    var lineChartState = {
        tempUnitState,
        intervalState,
    };

    // Get lastest record of station
    const getRecord = () => {
        fetch(`http://localhost:8000/api/records/latest/station/9`)
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
                            <div className={cx('wind-speed-display')}>
                                <SemiCircleProgress
                                    stroke={'var(--main-color)'}
                                    percentage={record.average_wind_speed ? record.average_wind_speed : 15}
                                    diameter={160}
                                />
                            </div>
                            <div className={cx('property-value', 'wind-speed-value')}>
                                <h2>{record.average_wind_speed ? record.average_wind_speed : 15}km/h</h2>
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
                                    colors={['#6df060', '#eff020', '#f22822']}
                                    states={tempStates}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className={(cx('details-property'), cx('grid-item'))}>
                        <div className={cx('property-content')}>
                            <div className={cx('property-name')}>
                                <div className={cx('property-title')}>Visibility</div>
    
                                <i className={cx('property-icon')}>
                                    <FontAwesomeIcon icon={faDroplet} />
                                </i>
                            </div>
                            <div className={cx('property-value')}>
                                <h2>{record.visbility}m</h2>
                                <div className={cx('property-state')}>{visbilityState}</div>
                            </div>
                            <div className={cx('property-display')}>
                                <SegmentedProgressBar
                                    completed={record.visbility}
                                    stopNumbers={humStopNumbers}
                                    colors={['var(--main-color)', 'var(--main-color)', 'var(--main-color)']}
                                    states={humStates}
                                />
                            </div>
                        </div>
                    </div> */}
                    <div className={(cx('details-property'), cx('grid-item'))}>
                        <div className={cx('property-content')}>
                            <div className={cx('property-name')}>
                                <div className={cx('property-title')}>Visibility</div>

                                <i className={cx('property-icon')}>
                                    <FontAwesomeIcon icon={faWater} />
                                </i>
                            </div>
                            <div className={cx('property-value')}>
                                <h2>{record.visbility}m</h2>
                            </div>
                            <ProgressBar completed={record.visbility} />
                        </div>
                    </div>
                    {/* <div className={(cx('details-property'), cx('grid-item'))}>
                        <div className={cx('property-content')}>
                            <div className={cx('property-name')}>
                                <div className={cx('property-title')}>Chanse rain</div>
    
                                <i className={cx('property-icon')}>
                                    <FontAwesomeIcon icon={faCloudShowersHeavy} />
                                </i>
                            </div>
                            <div className={cx('property-value')}>
                                <h2>42%</h2>
                            </div>
                            <div className={cx('property-display')}>
                                <SegmentedProgressBar
                                    completed={42}
                                    stopNumbers={chanseRainStopNumbers}
                                    colors={[
                                        'var(--main-color)',
                                        'var(--main-color)',
                                        'var(--main-color)',
                                        'var(--main-color)',
                                        'var(--main-color)',
                                    ]}
                                    states={chanseRainStates}
                                />
                            </div>
                        </div>
                    </div> */}
                    <div className={(cx('details-property'), cx('grid-item'))}>
                        <div className={cx('property-content')}>
                            <div className={cx('property-name')}>
                                <div className={cx('property-title')}>Rain Cumulative</div>

                                <i className={cx('property-icon')}>
                                    <FontAwesomeIcon icon={faCloudRain} />
                                </i>
                            </div>
                            <div className={cx('property-value')}>
                                <h2>24mm</h2>
                            </div>
                            <div className={cx('property-display')}>
                                <SegmentedProgressBar
                                    completed={24}
                                    stopNumbers={rainCumulativeStopNumbers}
                                    colors={[
                                        'var(--main-color)',
                                        'var(--main-color)',
                                        'var(--main-color)',
                                        'var(--main-color)',
                                        'var(--main-color)',
                                        'var(--main-color)',
                                        'var(--main-color)',
                                        'var(--main-color)',
                                        'var(--main-color)',
                                    ]}
                                    states={rainCumulativeStates}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weather forecast section */}
                <h2 className={cx('today-details--title')}>Weather forecast</h2>
                <div className={cx('weather-forecast')}>
                    <div className={cx('weather-forecast-actions')}>
                        <div>
                            <Menu items={TEMPERATURE_UNITS} sizeList="size-list-small" onChange={setTempUnitState}>
                                <button className={cx('forecast-actions-item')}>
                                    <div className={cx('forecast-actions-item-title')}>&deg;{tempUnitState}</div>
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
                <SidebarRight sidebarColor="#121010" tempDisplay={tempDisplay}></SidebarRight>
            </div>
        </div>
    );
}

export default Dashboard;
