import classNames from 'classnames/bind';
import {
    faBell,
    faCircleQuestion,
    faCloudUpload,
    faCog,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';

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
    const currentUser = true;

    // Handle logic
    const handleMenuChange = (menuItem) => {
        menuItem = 'hiih';
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@nblackk',
        },
        {
            icon: <FontAwesomeIcon icon={faMoon} />,
            title: 'Appearance',
            separate: true,
            children: {
                title: 'Appearance',
                data: [
                    {
                        type: 'appearance',
                        code: 'dark',
                        title: 'Dark',
                    },
                    {
                        type: 'appearance',
                        code: 'light',
                        title: 'Light',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCog} />,
            title: 'Settings',
            to: '/setting',
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
            <Search />

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
                        <Image
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
        </div>
    );
}

export default Header;
