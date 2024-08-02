import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import React , { useContext, useEffect, useState } from 'react';
import big_device from '../../assets/Group 1.svg'
import small_device from '../../assets/Group 2.svg'
import { Button, Row, Image  } from 'react-bootstrap';
import DeviceItem from './DeviceItem';
import {useDispatch,useSelector} from 'react-redux'
import {fetchRating} from "../../http/deviceAPI";


const DeviceList = observer(() => {
    const [allRatings, setAllRatings]= useState([])
    const {device} = useContext(Context)
    const dispatch = useDispatch()

    const col_num = useSelector(state => state.col)
    const changeColNum = (num) => {
        dispatch({type:"CHANGE_COL_NUM", payload:num})    
    }

    useEffect(() => {
        fetchRating()
        .then(rating => setAllRatings(rating))
    }, [])

    function countReview(device){
        let count = 0
        allRatings.map(rate=>{
            if(rate.deviceId == device.id){
                count++
            }
        })
        return count
    }

    return (
        <> 
             <div className='d-flex justify-content-end'>
                <div id='select_gid_buttons'>
                    <Button
                        style={col_num > 3  ? {cursor: 'pointer', border:'0px solid grey'} : {cursor: 'pointer', border:'3px solid rgb(152, 162, 255)', fill:'rgb(152, 162, 255)'}}
                        title="Малая плитка"
                        variant={'outline-light'} 
                        className="m-1 p-1"
                        onClick={()=>{
                            changeColNum(3) 
                        }}
                    >
                        <Image width={22} height={22} src={small_device}/>
                    </Button> 
                    <Button
                        style={ col_num < 4  ? {cursor: 'pointer', border:'0px solid grey'} : {cursor: 'pointer', border:'3px solid rgb(152, 162, 255)', fill:'rgb(152, 162, 255)'}}
                        title="Крупная плитка"
                        variant={'outline-light'} 
                        className="m-1 p-1"
                        onClick={()=> changeColNum(4)}
                    >
                        <Image width={22} height={22} src={big_device} />
                    </Button>                     
                </div>
             </div>
             <Row className="d-flex">
                {device.devices.map(device =>
                    <DeviceItem key={device.id} devicee={device} col={col_num} small={6} rewiewCount={countReview(device)}/>
                )}
            </Row>
        </>

    );
});

export default DeviceList;