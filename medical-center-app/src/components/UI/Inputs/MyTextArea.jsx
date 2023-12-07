import React from 'react';
import styles from './Styles.module.css';

const MyTextArea = (props) => {
    return (
        <textarea class={styles.textArea}
            className={styles.textArea}
            {...props}
        />
    );
};

export default MyTextArea;
