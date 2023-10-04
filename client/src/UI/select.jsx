import React from 'react';
import classes from "../css/index.module.scss";

const Select = ({value, onChange, onFocus, onBlur, options}) => {

    return (
        <div className={classes.select__jsx}>
            <select
                value={value === '' ? 'default' : value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                <option value={'default'} disabled>
                    Выбрать
                </option>
                {options.map((m, index) =>
                    <option key={index} value={m.value}>
                        {m.name}
                    </option>
                )}

            </select>
        </div>
    );
};

export default Select;