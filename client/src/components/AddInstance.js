import React, {useState} from 'react';
import classes from "../css/index.module.scss";
import Input from "../UI/input";
import Button from "../UI/button";

const AddInstance = ({setLoad}) => {

    const TargetFocus = (id) => {
        document.getElementById(id).style = 'top: -15px; left: 0px; font-size: 10px; color: #333;'
    }
    const TargetBlur = (id, value) => {
        let styleLabel = document.getElementById(id)
        if (value !== '') {return false}
        else {styleLabel.style = 'top: 10px; font-size: 14px; color: #999999;'}
    }


    const [loginDetails, setLoginDetails] = useState([{idInstance: '', apiTokenInstance: ''}])
    const Auth = () => {
        if (!loginDetails[0].idInstance || !loginDetails[0].apiTokenInstance) {
            return false
        }
        localStorage.setItem('idInstance', loginDetails[0].idInstance)
        localStorage.setItem('apiTokenInstance', loginDetails[0].apiTokenInstance)
        setLoad(true)
    }

    return (
        <section className={classes.add_instance}>
            <div className={classes.modal}>
                <div className={classes.block}>
                    <label id={'label_1'}>Введите ID инстанса</label>
                    <Input
                        onFocus={() => TargetFocus('label_1')}
                        onBlur={(e) => TargetBlur('label_1', e.target.value)}
                        value={loginDetails[0].idInstance}
                        onChange={(e) => setLoginDetails(loginDetails.map(m => m ? {...m, ['idInstance'] : e.target.value} : m))}
                    />
                </div>
                <div className={classes.block}>
                    <label id={'label_2'}>Введите токен</label>
                    <Input
                        onFocus={() => TargetFocus('label_2')}
                        onBlur={(e) => TargetBlur('label_2', e.target.value)}
                        value={loginDetails[0].apiTokenInstance}
                        onChange={(e) => setLoginDetails(loginDetails.map(m => m ? {...m, ['apiTokenInstance'] : e.target.value} : m))}
                    />
                </div>
                <Button text={'Вход'} onClick={() => Auth()}/>
            </div>
        </section>
    );
};

export default AddInstance;