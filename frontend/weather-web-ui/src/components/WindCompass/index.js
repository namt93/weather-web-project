import classNames from 'classnames/bind';
import styles from './WindCompass.module.scss';

const cx = classNames.bind(styles);

function WindCompass({ value = 0, radius = 60, color = 'var(--main-color)' }) {
    const compassStyles = {
        height: `${radius}px`,
        width: `${radius}px`,
        borderRadius: `${radius}px`,
        boxShadow: '0px 0px 10px 4px rgba(0, 0, 255, 1)',
        // boxShadow: '0 0 10px rgba(0, 0, 0, .85)',
    };

    const arrowTransformStyles = {
        transform: `rotate(${value}deg)`,
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('compass')} style={compassStyles}>
                <div className={cx('direction-value')}>{value}</div>
                <div className={cx('arrow')} style={arrowTransformStyles}></div>
            </div>
        </div>
    );
}

export default WindCompass;
