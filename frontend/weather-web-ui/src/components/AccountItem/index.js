import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://scontent.fhan19-1.fna.fbcdn.net/v/t1.6435-9/82910604_1246605468870186_3947465074083364864_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=XwVtHAlbFrIAX9R6SoE&_nc_ht=scontent.fhan19-1.fna&oh=00_AfBgxrIB6EzqR5ECkWyqKfWFKJbsnJr5gca8r-jcs29ETw&oe=63DB8014"
                alt="Van"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van</span>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>nguyenvan</span>
            </div>
        </div>
    );
}

export default AccountItem;
