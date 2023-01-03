import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { faBell, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Poper';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 0);
    });

    return (
        <div className={cx('header')}>
            {/* Greating section */}
            <div className={cx('header-content')}>
                <h2 className={cx('header-greating')}>January 2022</h2>
                <p className={cx('greating-description')}>Thursday, Jan 4 2022</p>
            </div>

            {/* Search section */}
            <Tippy
                interactive
                visible={searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('header-search')}>
                    <div className={cx('search-bar')}>
                        <input
                            type="text"
                            className={cx('search-input')}
                            name="search"
                            placeholder="search"
                            spellCheck={false}
                        />
                        <button type="submit" className={cx('btn-search')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </Tippy>

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
