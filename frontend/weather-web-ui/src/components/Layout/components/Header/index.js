import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {
    faBell,
    faCircleQuestion,
    faCloudUpload,
    faCog,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faSearch,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { faMoon } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    });

    // Handle logic
    const handleMenuChange = (menuItem) => {};

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@nblackk',
        },
        {
            icon: <FontAwesomeIcon icon={faMoon} />,
            title: 'Appearance',
            to: '/appearance',
            separate: true,
        },
        {
            icon: <FontAwesomeIcon icon={faCog} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <div className={cx('header')}>
            {/* Greating section */}
            <div className={cx('header-content')}>
                <h2 className={cx('header-greating')}>January 2022</h2>
                <p className={cx('greating-description')}>Thursday, Jan 4 2022</p>
            </div>

            {/* Search section */}
            <HeadlessTippy
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
            </HeadlessTippy>

            <div className={cx('header-actions')}>
                {currentUser ? (
                    <>
                        <Tippy content="Upload Station" placement="bottom">
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faCloudUpload} />
                            </button>
                        </Tippy>
                        <Tippy content="Notifications" placement="bottom">
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faBell} />
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <>
                        <Button text>Upload</Button>
                        <Button primary>Log in</Button>
                    </>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                    {currentUser ? (
                        <img
                            className={cx('user-avatar')}
                            src="https://yt3.ggpht.com/yti/AJo0G0moP2iN4Ri8AEWfM2AFQNZq6nLl9EPQKGtqu_FK=s88-c-k-c0x00ffffff-no-rj-mo"
                            alt="NBlacKK"
                        />
                    ) : (
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}
                </Menu>
            </div>

            {/* Dropdown section */}
            {/* <div className={cx('header-dropdown')}>
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
            </div> */}
        </div>
    );
}

export default Header;
