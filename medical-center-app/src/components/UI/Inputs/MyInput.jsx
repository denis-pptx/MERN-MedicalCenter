import React from 'react';
import styles from './Styles.module.css';

const MyInput = (props) => {
    return (
        <input
            className={styles.input}
            {...props}
        />
    );
};

export default MyInput;
