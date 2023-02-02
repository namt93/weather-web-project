import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCloudSun, faCog, faTh } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <nav className={cx('sidebar')}>
                <h3 className={cx('sidebar__heading')}>
                    <i className={cx('sidebar__heading-icon')}>
                        <FontAwesomeIcon icon={faCloudSun} />
                    </i>
                    <div className={cx('name-app')}> Wanru</div>
                </h3>
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
        </div>
    );
}

export default Sidebar;
