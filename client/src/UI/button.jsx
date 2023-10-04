import React from 'react';
import classes from "../css/index.module.scss";

const Button = ({onClick, text, style}) => {
    return (
        <div className={classes.button__jsx}>
            <button
                onClick={onClick}
                style={style}
            >
                {text}
            </button>
        </div>
    );
};

export default Button;