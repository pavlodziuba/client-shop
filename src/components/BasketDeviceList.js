import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import React , { useContext } from 'react';
import { Image, Row } from 'react-bootstrap';
import BasketDeviceItem from './BasketDeviceItem';
import empty_basket_icon from '../assets/empty_basket_icon.svg'

const BasketDeviceList = observer(() => {
    const {device} = useContext(Context)
    const {basket} = useContext(Context)

    let totalCount = 0
    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
    device.devices.map(device => 
        basket.baskets.map(basket => 
            basket.deviceId == device.id ? totalCount = (totalCount  +  (device.price *  basket.deviceNum)) : ''
        )
    )
    return (
        <>
            {
                totalCount > 0 ?
            <>
                <div className="p-4" style={{fontWeight:800,fontSize:'25px'}}>Всего: {numberWithSpaces(totalCount)} $</div>
                <Row className="d-flex">
                    {
                        device.devices.map(device => 
                            basket.baskets.map(basket => 
                                basket.deviceId == device.id ? <BasketDeviceItem key={device.id} devicee={device} basketNum={basket.deviceNum}/> : ''
                            )
                        )
                    }
                </Row>
            </>
            :
            <>
                <div className="d-flex justify-content-center align-items-center flex-column" style={{minHeight:'50vh'}}>
                    <Image width={'100%'} style={{maxHeight: 300}} src={empty_basket_icon}/>
                    <h1>Корзина пуста</h1>
                    <p></p>
                    <h5 style={{color:'grey'}}>Но это никогда не поздно исправить :)</h5>
                </div>
                
                
            </>
            }
            

        </>

    );
});

export default BasketDeviceList;
