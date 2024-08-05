import React, { useContext, useState,useEffect}  from 'react';
import {Button, Card, Col, Image,Form,} from "react-bootstrap";
import star from '../assets/Star2.png'
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
import { Context } from '..';
import {addBasketDevice,deleteBasketDevice,remBasketDevice,fetchBasketDevices} from "../http/deviceAPI";
import trash_can from '../assets/trash_can.png'
import { observer } from 'mobx-react-lite';
import {useDispatch} from 'react-redux'

const BasketDeviceItem = observer(({devicee,basketNum}) => {
    const navigate = useNavigate();
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const dispatch = useDispatch()

    const changeBasketlNum = () => {
        fetchBasketDevices(user.userId)
        .then(data => {
            basket.setBasket(data)
            dispatch({type:"CHANGE_BASKET_NUM", payload:data.length})  
        })
    }
    const changeEmptyBasketlNum = () => {
        dispatch({type:"CHANGE_BASKET_NUM", payload:0})    
    }

    // devicee = info about current device 
    
    const delDevice = () => {
        basket.baskets.map(i =>{
            if(i.deviceId === devicee.id && i.basketId === user.userId){
                //delete device from Basket
                deleteBasketDevice(i.id)
                //delete device from DeviceStorage 
                device.devices.map(j => { 
                    if(devicee.id === j.id){        
                        device.dellDevice(device.devices.indexOf(j))
                    }
                })
            }
        })
        fetchBasketDevices(user.userId)
        .then(data => {
            basket.setBasket(data)
            basket.baskets.length > 0 ? changeBasketlNum() : changeEmptyBasketlNum() 
        })
    }
    
    const decCounterDevice= () => {
        basket.baskets.map(i => {
            if(devicee.id == i.deviceId){
                i.deviceNum = i.deviceNum - 1
                i.deviceNum < 1 ? delDevice() : remBasketDevice(i)
            }
        })
    }
    
    const incCounterDevice = () => {
        basket.baskets.map(i => {
            if(devicee.id == i.deviceId){
                i.deviceNum = i.deviceNum + 1
                addBasketDevice(i)
            }
        })
    }

    const setNewNum = (num) => {
        num = Math.max(1, Math.min(5, num));
        basket.baskets.map(i => {
            if(devicee.id == i.deviceId){
                i.deviceNum = num
                remBasketDevice(i,num)  
            }
        })
    }
    return ( 
        <Col md={3} className={"mt-2 p-0"} >
            <div><Button className={"mb-2"} variant={"outline-danger"} onClick={() => delDevice()} ><Image className='mb-1' width={22} height={22} src={trash_can}/> Удалить</Button></div>
            <Card style={{width: '100%', cursor:"pointer", padding:5}} border={"light"} onClick={()=> navigate(DEVICE_ROUTE + '/' + devicee.id)}>
                <Image width={'100%'} style={{minHeight: 200}} src={devicee.img}/>
                <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                    <div>
                        {device.brands.map(brand =>
                            <div
                                key={brand.id}
                            >
                                {devicee.brandId === brand.id ? brand.name  :  ''}
                            </div>    
                        )}
                    </div>
                    <div className='d-flex align-items-center'>
                        <div>
                            {devicee.rating}
                        </div>
                        <Image width={17} height={17} src={star}/>
                    </div>
                </div> 
                <div>
                  {devicee.name}
                </div>
                <div style={{fontSize:20, fontWeight:'bold'}} >
                    {devicee.price} $
                </div>
            </Card>
            <div className='d-flex align-items-center justify-content-center' style={{fontSize:20, fontWeight:'bold'}} >
                <Button className={"mt-2"} variant={"outline-success"} style={basketNum < 2  ? {color:'grey'} : {}} disabled={basketNum < 2} onClick={() => decCounterDevice()}>-</Button>
                    <div className={"ml-2"}>
                        <Form.Control
                            value={basketNum}
                            onChange={e => setNewNum(Number(e.target.value))}
                            className="mt-2"
                            type="number"
                        />
                    </div>
                <Button className={"ml-2 mt-2"} variant={"outline-success"} style={basketNum < 2  ? {color:'grey'} : {}} disabled={basketNum > 4} onClick={() => incCounterDevice()}>+</Button>
            </div>
        </Col>
    );
});

export default BasketDeviceItem;