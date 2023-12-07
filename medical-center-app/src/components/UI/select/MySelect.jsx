import React from 'react';
import styles from './MySelect.module.css';

const MySelect = ({ options, defaultName, value, onChange }) => {
    return (
        <select
            className={styles.select}
            value={value}
            onChange={event => onChange(event)}
        >
            <option
                className={styles.option} 
                disabled
                value=""
            >
                {defaultName}
            </option>

            {options.map(option =>
                <option
                    className={styles.option}
                    key={option.value}
                    value={option.value}>

                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;
