import React, {useEffect, useState} from 'react';
import classes from "../css/index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faGripLines,
    faFaceLaughBeam,
    faPaperclip,
    faMicrophone,
    faCheck,
    faCircleRight } from '@fortawesome/free-solid-svg-icons'
import AddInstance from "../components/AddInstance";
import Button from "../UI/button";
import dateFormat from "dateformat";
import {fetchData} from "../http/otherApi";
import {DeleteNotification, GetChatHistory, GetReceiveNotification, SendMessage} from "../api/api";

const Whatsapp = () => {


    // const limit = 25;
    // let page = 1;
    // let getContactsListQueryUrl = '/api/v4/contacts';
    // let addTasksQueryUrl = '/api/v4/tasks';
    //
    // function addTasks(userId) {
    //     $.ajax({
    //         url: addTasksQueryUrl,
    //         method: 'POST',
    //         data: {
    //             text: 'Контакт без сделок',
    //             complete_till: new Date().setDate(new Date().getDate() + 7),
    //             responsible_user_id: userId
    //         }
    //     }).done(function(data) {
    //         if (!!data) {
    //             console.log(data)
    //             getContacts();
    //         } else {
    //             return false;
    //         }
    //     }).fail(function(data) {
    //         console.log('Что-то пошло не так c добавлением задачи');
    //         return false;
    //     })
    // }
    //
    // function getContacts() {
    //     $.ajax({
    //         url: getContactsListQueryUrl,
    //         method: 'GET',
    //         data: {
    //             limit: limit,
    //             with: 'leads',
    //             page: page
    //         }
    //     }).done(function(data) {
    //         if (data) {
    //             for (let i = 0; data._embedded.contacts.length < 0; i++) {
    //                 if (data._embedded._embedded.leads[i]) {
    //                     return false
    //                 }
    //                 addTasks(data._embedded.contacts[0].id[i])
    //             }
    //         } else {
    //             console.log('Контактов нет');
    //             return false;
    //         }
    //     }).fail(function(data) {
    //         console.log('Что-то пошло не так c получением контактов');
    //         console.log(data);
    //         return false;
    //     })
    //
    //     page++;
    // }
    // getContacts();

    const [load, setLoad] = useState(false)
    useEffect(() => {
        let instance = localStorage.getItem('idInstance')
        let token = localStorage.getItem('apiTokenInstance')
        if (instance && token) {
            // fetchData(instance, token).then(data => console.log(data)).catch(error => console.log(error))
            setLoad(true)
        }
    }, [load])


    const [history, setHistory] = useState([])
    const [message, setMessage] = useState('')
    const [selectChat, setSelectChat] = useState({})
    const [chatId, setChatId] = useState([{id: 1, img: '', name: 79513428000, message: 'NULL'}])

    const AddChat = () => {
        let result = prompt('Номер телефона в формате 79999999999', '')
        if (!result) return false
        setChatId([...chatId, {id: chatId.length + 1, img: '', name: result, message: 'NULL'}])
    }



    const SendWhatsApp = () => {
        if (!message) {
            return false
        }
        SendMessage(message, selectChat).then(success => {
            console.log(success)
            setMessage('')
        }).catch(error => console.log(error))
    }
    const GetChatWhatsApp = (number) => {
        GetChatHistory(number).then(success => {
            console.log(success)
            setHistory(success)
        }).catch(error => console.log(error))
    }



    if (!load) {
        return <AddInstance setLoad={setLoad}/>
    }

    return (
        <section className={classes.whatsapp}>
            <div className={classes.whatsapp_padding}>
                <div className={classes.whatsapp_grid}>
                    <div className={classes.left}>
                        <div className={classes.left_header}>
                            <div className={classes.flex_space}>
                                <div className={classes.img}>

                                </div>
                                <Button onClick={() => AddChat()} text={'Создать чат'} style={{margin: '0'}}/>
                            </div>
                        </div>
                        <div className={classes.search}>
                            <label>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </label>
                            <input type={'text'} placeholder={'Поиск'}/>
                            <button><FontAwesomeIcon icon={faGripLines} /></button>
                        </div>
                        <div className={classes.contacts}>

                            {chatId.map((m, index) =>
                                <div
                                    style={selectChat.id === m.id ? {background: '#e1e1e1'} : {}}
                                    onClick={() => {
                                        setSelectChat({id: m.id, img: m.img, name: m.name, message: m.message})
                                        GetChatWhatsApp(m.name)
                                    }}
                                    key={index}
                                    className={classes.contact}
                                >
                                    <div className={classes.contact_img}>

                                    </div>
                                    <div className={classes.contact_info}>
                                        <a>{m.name}</a>
                                        <p>{m.message}</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>



                    <div className={classes.right}>
                        <div className={classes.right_header}>
                            <div className={classes.flex_space}>
                                <div className={classes.img}>

                                </div>
                                <div className={classes.name}>
                                    {selectChat.name}
                                </div>
                            </div>
                        </div>

                        <div className={classes.right_messages}>
                            {history.length ?
                                history.map((m, index) =>
                                    m.typeMessage === 'extendedTextMessage' ?
                                <div
                                    style={{justifyItems: 'left'}}
                                    key={index}
                                    className={classes.message}
                                >
                                    <div
                                        style={{background: '#a7f0e1'}}
                                        className={classes.message_background}>
                                        <a>{m.textMessage}</a>
                                        <p>{dateFormat(new Date(m.timestamp * 1000).toString(), "HH:MM:ss")} <FontAwesomeIcon icon={faCheck} /></p>
                                    </div>
                                </div>
                                        : <div
                                            style={{justifyItems: 'right'}}
                                            key={index}
                                            className={classes.message}
                                        >
                                            <div
                                                style={{background: '#FFF'}}
                                                className={classes.message_background}>
                                                <a>{m.textMessage}</a>
                                                <p>{dateFormat(new Date(m.timestamp * 1000).toString(), "HH:MM:ss")} <FontAwesomeIcon icon={faCheck} /></p>
                                            </div>
                                        </div>
                            ) : ''}
                        </div>

                        <div className={classes.right_keyboard}>
                            <div className={classes.icon}>
                                <FontAwesomeIcon icon={faFaceLaughBeam} />
                            </div>

                            <div className={classes.icon}>
                                <FontAwesomeIcon icon={faPaperclip} />
                            </div>

                            <input
                                type={'text'}
                                placeholder={'Введите сообщение'}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <div onClick={SendWhatsApp} className={classes.icon}>
                                {/*<FontAwesomeIcon icon={faMicrophone} />*/}
                                <FontAwesomeIcon icon={faCircleRight} />
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Whatsapp;