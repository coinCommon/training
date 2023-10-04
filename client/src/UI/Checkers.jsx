import React from 'react';
import classes from "../css/index.module.scss";

const Checkers = ({background, borderColor}) => {

    return (
        <div className={classes.checkers} style={{background: background, borderColor: borderColor}}>
            <div className={classes.checkers_border_one} style={{borderColor: borderColor}}>
                <div className={classes.checkers_border_two} style={{borderColor: borderColor}}>
                </div>
            </div>
        </div>
    );
};

export default Checkers;