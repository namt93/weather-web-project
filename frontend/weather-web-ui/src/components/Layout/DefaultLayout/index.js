import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Header from '~/components/Layout/components/Header';
import styles from './DefaultLayout.module.scss';
import Sidebar, { SidebarRight } from './Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    // const [tempDisplay, setTempDisplay] = useState(0);

    // Get lastest record of station
    const getTempDisplay = () => {
        fetch(`http://localhost:8000/api/records/latest/station/9`)
            .then((res) => res.json())
            .then((res) => {
                // setTempDisplay(res?.temperature);
            })
            .catch(() => {
                console.log('Error fetch');
            });
    };

    // Every 3s
    useEffect(() => {
        const timerId = setInterval(() => {
            getTempDisplay();
        }, 3000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            {/* <SidebarRight tempDisplay={tempDisplay}></SidebarRight> */}
        </div>
    );
}

export default DefaultLayout;
