import React from 'react'

import style from './SubmitButton.module.css';

function SubmitButton({ width , height , children }) {
    return (
        <button className={style["submit-button"]} style={{
            width: {width} ,
            height: {height}
        }}>
            <span className={style["button-content"]}>{children}</span>
        </button>
    );
}

export default SubmitButton;