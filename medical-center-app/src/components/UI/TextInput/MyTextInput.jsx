import React from 'react';
import styles from './MyTextInput.module.css';

const MyTextInput = (props) => {
    return (
        <input
            type="text"
            className={styles.input}
            {...props}
        />
    );
};

export default MyTextInput;
