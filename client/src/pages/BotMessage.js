import React, {useMemo, useState} from 'react';
import classes from "../css/index.module.scss";

const BotMessage = () => {

    const [historyMessage, setHistoryMessage] = useState([])
    const [inputMessage, setInputMessage] = useState('')

    const [load, setLoad] = useState(0)

    const TheUserWrites = (value) => {
        setInputMessage(value)
    }


    const TheUserSends = () => {
        if (inputMessage === '') {
            return false
        }
        setHistoryMessage([...historyMessage, {text: inputMessage, author: 'User'}])
        setInputMessage('')

        let element = document.getElementById('label1')
        element.style = `opacity: 1; visibility: visible;`
        setTimeout(() => {
            setLoad(load+1)
            element.style = `opacity: 0; visibility: hidden;`
        }, 1500)
    }

    const TheBotReads = () => {

    }
    const TheBotSends = () => {
    }

    useMemo(() => {
        let bool = false
        let bool1 = false
        historyMessage.map(m => m.text.toUpperCase().toLowerCase() === 'Привет'.toUpperCase().toLowerCase()).filter(f => f ? bool = true : bool = false)
        historyMessage.map(m => m.text.toUpperCase().toLowerCase() === 'Пока'.toUpperCase().toLowerCase()).filter(f => f ? bool1 = true : bool1 = false)
        if (bool) {
            setHistoryMessage([...historyMessage, {text: 'Привет, мой друг! Я робот Джек! Какой вопрос ты желаешь задать мне?', author: 'Bot'}])
            return false
        }
        if (bool1) {
            setHistoryMessage([...historyMessage, {text: 'Как? Уже уходите? :(', author: 'Bot'}])
            return false
        }
        if (!bool && !bool1) {
            setHistoryMessage([...historyMessage, {text: 'Извините, такому меня еще не научили, но я быстро учусь :)', author: 'Bot'}])
            return false
        }
    }, [load])

    return (
        <div className={classes.container}>
            <div
                className={classes.bot_messenger_container}
            >
                <h3>BOT v.0.0.001</h3>
                <div
                    style={{height: window.innerHeight - 250}}
                    className={classes.board}
                >
                        {historyMessage.slice(0).reverse().map((m, index) =>
                            <p
                                style={m.author === 'Bot' ? {background: '#19a22d', color: '#FFF', textAlign: 'left', float: 'left'} : {}}
                                key={index}
                            >
                                {m.text}
                            </p>
                        )}
                </div>
                <div className={classes.management}>

                    <input
                        value={inputMessage}
                        onChange={(e) => TheUserWrites(e.target.value)}
                        type={'text'}
                        name={'default'}
                        placeholder={'Давай поговорим'}
                    />
                    <label id={'label1'}>пишет сообщение ...</label>
                    <button
                        onClick={() => TheUserSends()}
                    >
                        Отправить
                    </button>

                </div>
            </div>
        </div>
    );
};

export default BotMessage;