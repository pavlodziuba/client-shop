import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {fetchSeenBasketDevices, fetchBasketDevices,createSeenBasketDevices} from "./http/deviceAPI";
import {useDispatch} from 'react-redux'


const App = observer(() => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    const changeBasketlNum = () => {
        fetchBasketDevices(user.userId)
        .then(data => {
            basket.setBasket(data)
            dispatch({type:"CHANGE_BASKET_NUM", payload:data.length})  
        })   
    }
    function SetLastSeenDevices(userId,basket){
        fetchSeenBasketDevices(userId)
        .then(data => {
            data.map(item => {
                basket.setLastSeenDevices(item.deviceIdArr)
            })    
        })
    }

    function  SetBasketDevices(userId){
        fetchBasketDevices(userId)
        .then(data => {
            basket.setBasket(data)
        })
        .then(() => {
            if(basket.baskets.length > 0) changeBasketlNum()
        })
    }
    useEffect(() => {
        check()
        .then(data => {
            if(data == undefined){return}
            if(data.role === 'ADMIN'){
                 console.log(data.role)
                 user.setADMIN(true)
            }
            user.setUserId(data.id)
            user.setUser(true)
            user.setIsAuth(true)
        })
        .finally(() => {
            // Set current lastSeenDevices for current user
            basket.setLastSeenDevicesEmpty([])  
            SetLastSeenDevices(user.userId,basket)
            // Set current basketDevices for current user
            SetBasketDevices(user.userId)
            
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
});


export default App;