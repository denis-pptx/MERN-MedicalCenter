import React from 'react';
import styles from './MyInput.module.css';

const MyInput = ({ value, onChange, placeholder }) => {
    return (
        <input
            type="text"
            className={styles.input}
            value={value}
            onChange={(event) => onChange(event)}
            placeholder={placeholder}
        />
    );
};

export default MyInput;
