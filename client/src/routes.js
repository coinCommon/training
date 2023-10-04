import {BOOK_ROUTE, BOT_ROUTE, GAME_ROUTE, MAIN_ROUTE, TASK_ROUTE, WHATSAPP_ROUTE} from "./utils/const";
import Game from "./pages/Game";
import Main from "./pages/Main";
import Task from "./pages/Task";
import Book from "./pages/Book";
import Whatsapp from "./pages/Whatsapp";
import BotMessage from "./pages/BotMessage";


export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: GAME_ROUTE,
        Component: Game
    },
    {
        path: TASK_ROUTE,
        Component: Task
    },
    {
        path: BOOK_ROUTE,
        Component: Book
    },
    {
        path: WHATSAPP_ROUTE,
        Component: Whatsapp
    },
    {
        path: BOT_ROUTE,
        Component: BotMessage
    }
]