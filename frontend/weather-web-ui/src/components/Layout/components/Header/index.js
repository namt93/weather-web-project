import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { faBell, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            {/* Greating section */}
            <div className={cx('header-content')}>
                <h2 className={cx('header-greating')}>January 2022</h2>
                <p className={cx('greating-description')}>Thursday, Jan 4 2022</p>
            </div>

            {/* Search section */}
            <div className={cx('header-search')}>
                <div className={cx('search-bar')}>
                    <input type="text" className={cx('search-input')} name="search" placeholder="search" />
                    <button type="submit" className={cx('btn-search')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>

            {/* Dropdown section */}
            <div className={cx('header-dropdown')}>
                <div className={cx('notification-btn')}>
                    <i className={cx('notification-icon')}>
                        <FontAwesomeIcon icon={faBell} />
                    </i>
                </div>

                <div className={cx('user-btn')}>
                    <i className={cx('user-icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </i>
                </div>
            </div>
        </div>
    );
}

export default Header;
