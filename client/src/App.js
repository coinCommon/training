import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Link/header";
import Formular from "../src/font/stylesheet.css"

const App = () => {
  return (
    <BrowserRouter>
        <Header/>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
