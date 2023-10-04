import React from 'react';
import classes from "../css/index.module.scss";

const Textarea = ({value, onChange, onFocus, onBlur}) => {
    return (
        <div className={classes.textarea__jsx}>
            <textarea
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            >

            </textarea>
        </div>
    );
};

export default Textarea;