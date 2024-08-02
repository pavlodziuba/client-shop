import {Routes, Route, Redirect} from 'react-router-dom'
import { authRoutes, publicRoutes} from '../routes';
import Shop from '../page/Shop';
import { useContext } from 'react';
import { Context } from '../index';

const AppRouter = () =>{
    const {user} = useContext(Context)
    return(
        <Routes>
            {user.isAuth  && authRoutes.map(({path,Component}) =>
                <Route key={path} path={path} element = {<Component/>} exect/>
            )}
            {publicRoutes.map(({path,Component}) =>
                <Route key={path} path={path} element = {<Component/>} exect/>
            )}
            {
                <Route path="*" element={<Shop/>}/>
            }
        </Routes>
    );
};


export default AppRouter;