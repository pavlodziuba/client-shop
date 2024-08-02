import React, { useContext, useEffect, useState }  from 'react';
import { Col, Card, Image } from 'react-bootstrap';
import scales from '../../assets/scales.png'
import buy_icon from '../../assets/buy_icon.png'
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/consts';
import { Context } from '../../index';
import { Button } from '@mui/material';
import {addBasketDevice,fetchBasketDevices} from "../../http/deviceAPI";
import {createCompare} from "../../http/compareAPI";
import { LOGIN_ROUTE, BASKET_ROUTE,COMPARE_ROUTE } from '../../utils/consts';
import {useDispatch,useSelector} from 'react-redux'
import { observer } from 'mobx-react-lite';
import Rating from '../starRating/Rating'
import './deviceItem.css'



const DeviceItem = observer(({devicee,col,small,md,sm,rewiewCount}) => {
    const navigate = useNavigate();
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const [inBusket, setInBusket] = useState(false)
    const dispatch = useDispatch() 
    let col_num = 3
    if(md<0){md=4}
    if(sm<0){sm=6}
    if(small<0){small=6}
    if(col < 0){
        col_num = useSelector(state => state.col)
    }else{
        col_num = col
    }

    useEffect(() => {
        basket.baskets.map(basketItem => {
            if(basketItem.deviceId == devicee.id){
                setInBusket(true)
            }
        })
    }, [basket.baskets])
    const changeBasketlNum = () => {
        fetchBasketDevices(user.userId).then(data => {
            dispatch({type:"CHANGE_BASKET_NUM", payload:data.length})  
            basket.setBasket(data)
        })  
    }

    //Buy button 
    const addItemToBasket = () => {
        if(user.isAuth){
            animateBasketIcon()
            const formData = new FormData()
            formData.append('basketId', `${user.userId}`)
            formData.append('deviceId', `${devicee.id}`)
            addBasketDevice(formData).then(() => changeBasketlNum())
            setInBusket(true)
        }else{
            alert('Авторизуйтесь!')
            navigate(LOGIN_ROUTE)
        }
    }
    
    //Compare button 
    const addItemToCompare = () => {
        if(user.isAuth){
            createCompare(user.userId,devicee.id,devicee.typeId)
        }else{
            alert('Авторизуйтесь!')
            navigate(LOGIN_ROUTE)
        }
    }

    const animateBasketIcon = () => {
        const jumpIcon = document.getElementById('nav_buy_icon')  
        jumpIcon.classList.add('animate');
        setTimeout(() => {
            jumpIcon.classList.remove('animate');
          }, 400)
    }
    return (
    <>
        <Col md={md} lg={col_num} sm={sm} className={`m-0 p-0 shop_item col-${small}`} style={{minHeight: '100%', padding:15}}>
            <Card className="shop_item_inner m-1" style={{minHeight: '100%'}} border={"light"}>
                <div style={{padding:15}}>
                    <div className='d-flex justify-content-end' style={{position:'absolute',right:8,top:8}}>
                            <button
                                className='scales-button' 
                                style={{border:0,zIndex:2,padding:7}}
                                onClick={() => {
                                    addItemToCompare()
                                }}>
                                <img className='scales-button__img'style={{height:24,width:24}} src={scales}></img>
                            </button>
                    </div>
                    <div style={{width: '100%',height: '100%', cursor:"pointer"}} onClick={()=> navigate(DEVICE_ROUTE + '/' + devicee.id)}>
                        <div className='goods-tile__picture'>
                            <img src={process.env.REACT_APP_API_URL + '/' +devicee.img}></img>
                        </div>
                        <div style={{fontSize:'14px',maxHeight:'40px',overflow:'hidden',marginBottom:'8px'}}>
                            {devicee.name}
                        </div>
                    </div>
                    <Rating  device={devicee} rewiewCount={rewiewCount} />

                    {/* <div>
                        {device.brands.map(brand =>
                            <div
                                key={brand.id}
                            >
                                {devicee.brandId === brand.id ? brand.name  :  ''}
                            </div>    
                        )}
                    </div>   */}
                    <div className='d-flex justify-content-between' style={{fontSize:20, fontWeight:'bold'}} >
                        <div>
                            {devicee.price} $
                        </div>
                        <div  style={{marginRigth:'15px'}}>
                            {
                                inBusket ?
                                    <Button 
                                        variant="contained" 
                                        color="success" 
                                        onClick={() => {
                                            navigate(BASKET_ROUTE )
                                        }}>
                                        <Image width={'100%'} style={{maxHeight: 30}} src={buy_icon}/>
                                    </Button>
                                :
                                    <Button 
                                        variant="outlined" 
                                        color="secondary" 
                                        onClick={() => {
                                            addItemToBasket()
                                        }}>
                                        <Image width={'100%'} style={{maxHeight: 30}} src={buy_icon}/>
                                    </Button>
                            }           
                        </div>
                    </div>
                </div>
            </Card>
        </Col>
    </>
    );
});

export default DeviceItem;