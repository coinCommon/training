import {Navigate, Route, Routes} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/const";
import {publicRoutes} from "../routes";


const AppRouter = () => {

    return(
        <Routes>
            {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact />
                )}
            <Route path='*' element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
}

export default AppRouter;