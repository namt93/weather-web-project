import React from 'react';

const ProgressBar = (props) => {
    const { completed } = props;
    const containerStyles = {
        height: '10px',
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: '8px',
        marginTop: '24px',
    };

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: 'var(--main-color)',
        borderRadius: 'inherit',
    };

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}></div>
        </div>
    );
};

export default ProgressBar;
