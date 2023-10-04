import React from 'react';
import classes from "../css/index.module.scss";

const Input = ({value, onChange, onFocus, onBlur}) => {
    return (
        <div className={classes.input__jsx}>
            <input value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
        </div>
    );
};

export default Input;