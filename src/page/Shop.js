import React, {useContext, useEffect,useState} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import LastSeenDevices from "../components/LastSeenDevices/LastSeenDevices";
import DeviceList from "../components/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes,fetchInfo,fetchSeenBasketDevices} from "../http/deviceAPI";
import Pages from "../components/Pages";
import { ALL_DEVICE_COUNT} from '../utils/consts';
import PriceBar from '../components/PriceBar';



const Shop = observer(() => {
    const {basket} = useContext(Context)
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    let max = 0

    useEffect(() => {
        device.setDevices([])

        // Add all types from DB in DeviceStorage
        fetchTypes().then(data => device.setTypes(data))

        // Add all brands from DB in DeviceStorage
        fetchBrands().then(data => device.setBrands(data))

        // Add all devices from DB in DeviceStorage
        fetchDevices(null,null, null, 1, ALL_DEVICE_COUNT).then(data => {
            if((data?.rows) === undefined){ return }
            device.setDevices(data.rows)

            // Set total device count in DeviceStorage
            device.setTotalCount(data.count)  
        })
        // Add all info about devices from DB in DeviceStorage
        fetchInfo().then(data =>  device.setidInfo(data)).finally(() => {

            //Find max info id in DB and set
            for (let i = 0; i < device.info.length; i++) {
                if(device.info[i].id > max){
                    max = device.info[i].id
                }
            }
            device.setMaxId(max) 
        })

        fetchSeenBasketDevices(user.userId).then(data => {
            data.map(item => {
                basket.setLastSeenDevices(item.deviceIdArr)
            })    
        })
    }, [])
    useEffect(() => {
        // Add devices with filters from DB in DeviceStorage
        fetchDevices(device.selectedPrice,device.selectedType.id, device.selectedBrand.id, device.page,  ALL_DEVICE_COUNT ).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand, device.selectedPrice])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>    
                    <TypeBar/>
                    <PriceBar/>
                </Col>
                <Col md={9}> 
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
            <LastSeenDevices />

        </Container>
    );
});

export default Shop;