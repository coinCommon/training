import React from 'react';
import classes from "../../css/index.module.scss";
import {useNavigate} from "react-router-dom";
import {BOOK_ROUTE, BOT_ROUTE, GAME_ROUTE, MAIN_ROUTE, TASK_ROUTE, WHATSAPP_ROUTE} from "../../utils/const";

const Header = () => {
    const navigate = useNavigate()
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.header_grid}>

                    <div className={classes.child}>
                        DRAG & DROP
                    </div>

                    <div className={classes.child}>
                        <div className={classes.flex}>
                            <p onClick={() => navigate(BOOK_ROUTE)}>
                                Book
                            </p>
                            <p onClick={() => navigate(MAIN_ROUTE)}>
                                Home
                            </p>
                            <p onClick={() => navigate(GAME_ROUTE)}>
                                Game
                            </p>
                            <p onClick={() => navigate(TASK_ROUTE)}>
                                Task
                            </p>
                            <p onClick={() => navigate(WHATSAPP_ROUTE)}>
                                WhatsApp
                            </p>
                            <p onClick={() => navigate(BOT_ROUTE)}>
                                BotMessenger
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;