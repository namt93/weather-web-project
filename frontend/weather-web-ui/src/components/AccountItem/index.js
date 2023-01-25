import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import styles from './AccountItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/user/${data.user_id}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.user_avatar} alt={data.username} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.username}</span>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>{data.username}</span>
            </div>
        </Link>
    );
}

export default AccountItem;
