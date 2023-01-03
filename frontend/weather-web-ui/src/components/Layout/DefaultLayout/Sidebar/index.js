import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCloudSun, faCog, fas, faThLarge } from '@fortawesome/free-solid-svg-icons';

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
                    <div className={cx('name-app')}>Wanru</div>
                </h3>
                <ul className={cx('sidebar-menu')}>
                    <li className={cx('sidebar-item sidebar-item--active')}>
                        <div className={cx('sidebar-content')}>
                            <i className={cx('sidebar-item-icon')}>
                                <FontAwesomeIcon icon={faThLarge} />
                            </i>
                            <a href="#" className={cx('sidebar-item__link')}>
                                Dashboard
                            </a>
                        </div>
                    </li>
                    <li className={cx('sidebar-item')}>
                        <div className={cx('sidebar-content')}>
                            <i className={cx('sidebar-item-icon')}>
                                <FontAwesomeIcon icon={faCalendar} />
                            </i>
                            <a href="" className={cx('sidebar-item__link')}>
                                Calendar
                            </a>
                        </div>
                    </li>
                    <li className={cx('sidebar-item')}>
                        <div className={cx('sidebar-content')}>
                            <i className={cx('sidebar-item-icon')}>
                                <FontAwesomeIcon icon={faCog} />
                            </i>
                            <a href="" className={cx('sidebar-item__link')}>
                                Setting
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
