import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCloudSun, faCog, faTh } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import { useEffect, useState } from 'react';
import SegmentedProgressBar from '~/components/Bar/SegmentedProgressBar';
import { GetAccuWeather12Hours } from '~/data/accuWeatherData';

const cx = classNames.bind(styles);

export function SidebarRight({ children, sidebarColor = 'var(--blue-black-color)', tempDisplay = 0 }) {
    const [displayTime, setDisplayTimer] = useState('');
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    const chanseRainStates = ['sunny', 'cloudy', 'rainy'];
    const chanseRainStopNumbers = [19, 51, 100];

    var sidebarCustomStyle = {
        backgroundColor: `${sidebarColor}`,
    };

    var timelines = [];

    const accuWeatherRecords = GetAccuWeather12Hours();

    // render timelines chance of rain
    const createTimelines = (currentHour) => {
        [1, 2, 3, 4, 5].map((value) => {
            var futureHour = value + currentHour;
            var futureHourString;
            var chanseRain = accuWeatherRecords[value]?.PrecipitationProbability;
            if (futureHour >= 24) {
                futureHour -= 24;
                futureHourString = `${futureHour}` + 'AM';
            } else if (futureHour > 12) {
                futureHour -= 12;
                futureHourString = `${futureHour}` + 'PM';
            } else {
                futureHourString = `${futureHour}` + 'AM';
            }
            timelines.push({ futureHourString, chanseRain });
        });
    };
    createTimelines(currentHour);

    const renderTimelines = () => {
        return timelines.map((time, index) => {
            return (
                <div key={index} className={cx('chanse-rain-item')}>
                    <div>{time.futureHourString}</div>
                    <SegmentedProgressBar
                        completed={time.chanseRain}
                        states={chanseRainStates}
                        colors={['rgb(61, 156, 250)', 'rgb(61, 156, 250)', 'rgb(61, 156, 250)']}
                        stopNumbers={chanseRainStopNumbers}
                    />
                </div>
            );
        });
    };

    // Set display timer every seconds
    useEffect(() => {
        const timerId = setInterval(() => {
            setDisplayTimer(currentTime.toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [displayTime]);

    return (
        <nav className={cx('sidebar-right')} style={sidebarCustomStyle}>
            <div className={cx('sidebar-right-heading')}>
                <div className={cx('sidebar-right-city')}>Ha Noi City</div>
                <div className={cx('sidebar-right-clock')}>{displayTime}</div>
                <div className={cx('sidebar-right-temperature')}>
                    {tempDisplay}
                    <div className={cx('temperature-unit')}>&deg;C</div>
                </div>
            </div>
            <div className={cx('chanse-rain-section')}>
                <div className={cx('chanse-rain-title')}>Chance of rain</div>
                {renderTimelines()}
            </div>

            {children}
        </nav>
    );
}

function Sidebar({ sidebarColor = 'var(--main-color)' }) {
    var sidbarStyle = {
        backgroundColor: `${sidebarColor}`,
    };

    return (
        <nav className={cx('sidebar')} style={sidbarStyle}>
            {/* <h3 className={cx('sidebar__heading')}>
                    <i className={cx('sidebar__heading-icon')}>
                        <FontAwesomeIcon icon={faCloudSun} />
                    </i>
                    <div className={cx('name-app')}> Wanru</div>
                </h3> */}
            <ul className={cx('sidebar-menu')}>
                <li className={cx('sidebar-item', { 'sidebar-item--active': window.location.pathname == '/' })}>
                    <Link to="/" className={cx('sidebar-item__link')}>
                        <div className={cx('sidebar-content')}>
                            <i className={cx('sidebar-item-icon')}>
                                <FontAwesomeIcon icon={faTh} />
                            </i>
                            <span className={cx('sidebar-item-title')}>Dashboard</span>
                        </div>
                    </Link>
                </li>
                <li
                    className={cx('sidebar-item', {
                        'sidebar-item--active': window.location.pathname == '/calendar',
                    })}
                >
                    <Link to="/calendar" className={cx('sidebar-item__link')}>
                        <div className={cx('sidebar-content')}>
                            <i className={cx('sidebar-item-icon')}>
                                <FontAwesomeIcon icon={faCalendar} />
                            </i>
                            <span className={cx('sidebar-item-title')}>Calendar</span>
                        </div>
                    </Link>
                </li>
                <li
                    className={cx('sidebar-item', {
                        'sidebar-item--active': window.location.pathname == '/setting',
                    })}
                >
                    <Link to="/setting" className={cx('sidebar-item__link')}>
                        <div className={cx('sidebar-content')}>
                            <i className={cx('sidebar-item-icon')}>
                                <FontAwesomeIcon icon={faCog} />
                            </i>
                            <span className={cx('sidebar-item-title')}>Setting</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
