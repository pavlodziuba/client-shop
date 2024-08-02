import React, {useContext, useEffect, useState} from 'react';
import {Container,Spinner} from "react-bootstrap";
import {fetchBasketDevices,fetchOneDevice} from "../http/deviceAPI";
import {Context} from "../index";
import { useNavigate } from 'react-router-dom';
import BasketDeviceList from "../components/BasketDeviceList";
import { observer } from 'mobx-react-lite';
import { configure } from "mobx"


configure({
    enforceActions: "never",
})


const Basket = observer(() =>{
    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const {basket} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [totalCount, setTotalCount] = useState(0)


    useEffect(() => { 
        // Clear arr of devices in DeviceStorage
        device.setDevices([])
        // Fetch current basketDevices for current user
        fetchBasketDevices(user.userId)
        .then(data => {
            SetBasketDeviceOnPage(data)
        })
    }, [])  

    function countTotalCount(){
        let totalCount = 0
        device.devices.map(device => 
            basket.baskets.map(basket => 
                basket.deviceId == device.id ? totalCount = (totalCount  +  (device.price *  basket.deviceNum)) : ''
            )
        )
        return totalCount
    }
    function SetBasketDeviceOnPage(data){

        basket.setBasket(data)
        basket.baskets.map(i =>{ 
            fetchOneDevice(i.deviceId).then(data => { 
                device.addDevice(data) 
            }) 
        })  
        setTimeout(() => {
            setTotalCount(countTotalCount())
            setLoading(false)
          }, 100)
    }
    if (loading) {
        return <Spinner animation={"grow"} style={{marginTop:'10%',marginLeft:'50%'}}/>
    }

    return(
        <Container>
            <BasketDeviceList totalCount={totalCount}/>
        </Container>
        
    );
});


export default Basket;