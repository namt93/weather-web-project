import {
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
import ProgressBar from './ProgressBar';

const cx = classNames.bind(styles);

function Dashboard() {
    const [record, setRecord] = useState({});

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

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('today-details--title')}>More details of today's weather</h2>
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
                                percentage={record.average_wind_speed}
                                diameter={140}
                            />
                        </div>
                        <div className={cx('property-value', 'wind-speed-value')}>
                            <h2>{record.average_wind_speed}km/h</h2>
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
                            <h2>{record.temperature} &deg;C</h2>
                        </div>
                        <ProgressBar completed={record.temperature * 2} />
                    </div>
                </div>
                <div className={(cx('details-property'), cx('grid-item'))}>
                    <div className={cx('property-content')}>
                        <div className={cx('property-name')}>
                            <div className={cx('property-title')}>Humidity</div>

                            <i className={cx('property-icon')}>
                                <FontAwesomeIcon icon={faDroplet} />
                            </i>
                        </div>
                        <div className={cx('property-value')}>
                            <h2>{record.humidity}%</h2>
                        </div>
                        <ProgressBar completed={record.humidity} />
                    </div>
                </div>
                <div className={(cx('details-property'), cx('grid-item'))}>
                    <div className={cx('property-content')}>
                        <div className={cx('property-name')}>
                            <div className={cx('property-title')}>Pressure</div>

                            <i className={cx('property-icon')}>
                                <FontAwesomeIcon icon={faWater} />
                            </i>
                        </div>
                        <div className={cx('property-value')}>{record.barometric_pressure}atm</div>
                        <div className={cx('property-display')}>{record.barometric_pressure}atm</div>
                    </div>
                </div>
                <div className={(cx('details-property'), cx('grid-item'))}>
                    <div className={cx('property-content')}>
                        <div className={cx('property-name')}>
                            <div className={cx('property-title')}>Chanse rain</div>

                            <i className={cx('property-icon')}>
                                <FontAwesomeIcon icon={faCloudShowersHeavy} />
                            </i>
                        </div>
                        <div className={cx('property-value')}>42%</div>
                        <div className={cx('property-display')}>42%</div>
                    </div>
                </div>
                <div className={(cx('details-property'), cx('grid-item'))}>
                    <div className={cx('property-content')}>
                        <div className={cx('property-name')}>
                            <div className={cx('property-title')}>Precipitation</div>

                            <i className={cx('property-icon')}>
                                <FontAwesomeIcon icon={faCloudRain} />
                            </i>
                        </div>
                        <div className={cx('property-value')}>1.4cm</div>
                        <div className={cx('property-display')}>1.4cm</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
