import React, {useContext, useEffect, useState} from 'react';
import {Container,Spinner,Row} from "react-bootstrap";
import {fetchOneDevice,fetchSeenBasketDevices,fetchInfo,fetchDevices,fetchTypes,fetchBrands} from "../http/deviceAPI";
import {createCompare,deleteCompare,fetchCompare} from "../http/compareAPI";
import {Context} from "../index";
import CompareDeviceList from "../components/Compare/CompareDeviceList";
import { observer } from 'mobx-react-lite';
import { configure } from "mobx"
import { ALL_DEVICE_COUNT} from '../utils/consts';

configure({
    enforceActions: "never",
})


const Compare = observer(() =>{
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const {compare} = useContext(Context)
    const [loading, setLoading] = useState(true)
    let max = 0

    useEffect(() => { 
        // Clear arr of devices in DeviceStorage
        device.setDevices([])
        // Fetch current basketDevices for current user

        fetchCompare()
        .then(data => {
            compare.setComparesInfosEmpty()
            compare.setCompares(data)
            compare.compares.map(i =>{ 
                fetchOneDevice(i.deviceId).then(data => { 
                    device.addDevice(data) 
                    compare.addComparesInfos(data.info)
                }) 
            })  
        })
        
        setTimeout(() => {
            setLoading(false)
          }, 100)
    }, [])  

    useEffect(() => {
        device.setDevices([])

        // Add all types from DB in DeviceStorage
        fetchTypes().then(data => device.setTypes(data))

        // Add all brands from DB in DeviceStorage
        fetchBrands().then(data => device.setBrands(data))


        fetchInfo().then(data =>  device.setidInfo(data)).finally(() => {

            //Find max info id in DB and set
            for (let i = 0; i < device.info.length; i++) {
                if(device.info[i].id > max){
                    max = device.info[i].id
                }
            }
            device.setMaxId(max) 
        })

    }, [])

    if (loading) {
        return <Spinner animation={"grow"} style={{marginTop:'10%',marginLeft:'50%'}}/>
    }
    return(
        <Container>
            <h1>Comparation</h1>
            <CompareDeviceList />
        </Container>
        
    );
});


export default Compare;