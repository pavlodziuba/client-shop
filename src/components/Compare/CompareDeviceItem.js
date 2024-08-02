import React, { useContext, useState,useEffect}  from 'react';
import {Button, Card, Col, Image,Row,} from "react-bootstrap";
import star from '../../assets/Star2.png'
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/consts';
import { Context } from '../../index';
import {addBasketDevice,deleteBasketDevice,remBasketDevice,fetchBasketDevices} from "../../http/deviceAPI";
import {deleteCompare} from "../../http/compareAPI";
import trash_can from '../../assets/trash_can.png'
import { observer } from 'mobx-react-lite';
import {useDispatch} from 'react-redux'

const ComparetDeviceItem = observer(({devicee,info}) => {
    const navigate = useNavigate();
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const {compare} = useContext(Context)




    
    const delDevice = () => {
        compare.compares.map(i =>{
            if(i.deviceId === devicee.id && i.userId === user.userId){
                //delete device from Basket
                deleteCompare(i.id)
                //delete device from DeviceStorage 
                device.devices.map(j => { 
                    if(devicee.id === j.id){        
                        device.dellDevice(device.devices.indexOf(j))
                    }
                })
            }
        })
    }
    




    return ( 
        <Col md={3} className={"mt-2 p-0"} >
            <div><Button className={"mb-2"} variant={"outline-danger"} onClick={() => delDevice()} ><Image className='mb-1' width={22} height={22} src={trash_can}/> Удалить</Button></div>
            <Card style={{width: '100%', cursor:"pointer", padding:5}} border={"light"} onClick={()=> navigate(DEVICE_ROUTE + '/' + devicee.id)}>
                <Image width={'100%'} style={{minHeight: 200}} src={process.env.REACT_APP_API_URL + devicee.img}/>
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
                <div style={{maxWidth:'100%',overflow:'hidden'}}>
                    {info.map(currentInfo =>
                         currentInfo.map((detail, index) =>
                            detail.deviceId == devicee.id ?
                            <div key={detail.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent',}}>
                                {detail.title}: {detail.description}
                            </div>
                            :
                            ''
                         )
 
                    )}
                </div>
            </Card>
        </Col>
    );
});

export default ComparetDeviceItem;