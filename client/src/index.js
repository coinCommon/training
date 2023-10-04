import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

export const Context = createContext(null)

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <Context.Provider value={{

    }}>
        <App/>
    </Context.Provider>
);
