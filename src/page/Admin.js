import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/models/CreateBrand';
import CreateDevice from '../components/models/CreateDevice';
import CreateType from '../components/models/CreateType';
import DeleteType from '../components/models/DeleteType';
import DeleteBrand from '../components/models/DeleteBrand';
import DeleteDevice from '../components/models/DeleteDevice';
import UpdateDevice from '../components/models/UpdateDevice';
import { fetchTypes,fetchBrands,fetchInfo,fetchAllDevices } from "../http/deviceAPI";
import {Context} from "../index";
import { observer } from 'mobx-react-lite';


const Admin = observer(() =>{
    const {device} = useContext(Context)
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [delBrandVisible, setDelBrandVisible] = useState(false)
    const [delTypeVisible, setDelTypeVisible] = useState(false)
    const [delDeviceVisible, setDelDeviceVisible] = useState(false)
    const [updateDeviceVisible, setUpdateDeviceVisible] = useState(false)   

    let max = 0 

    //Add all info in DeviceStorage if first load
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchAllDevices().then(data => device.setDevices(data.rows))
        fetchInfo().then(data =>  device.setidInfo(data)).finally(() => {
            for (let i = 0; i < device.info.length; i++) {
                if(device.info[i].id > max){
                    max = device.info[i].id
                }
            }
            device.setMaxId(max) 
        })

    }, [])
    return(
        
        <Container className="d-flex flex-column">
            <Button 
                variant={"outline-dark"} 
                className="mt-3 p-3"
                onClick={()=> setTypeVisible(true)}
            >
                Добавить тип
                </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-3 p-3"
                onClick={()=> setBrandVisible(true)}
            >
                Добавить бренд
                </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-3 p-3"
                onClick={()=> setDeviceVisible(true)}
            >
                Добавить устройство
                </Button>
                <CreateBrand show={brandVisible} onHide={()=> setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={()=> setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={()=> setTypeVisible(false)}/>
            <Button 
                variant={"outline-dark"} 
                className="mt-3 p-3"
                onClick={()=> setDelTypeVisible(true)}
            >
                Удалить тип
                </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-3 p-3"
                onClick={()=> setDelBrandVisible(true)}
            >
                Удалить бренд
                </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-3 p-3"
                onClick={()=> setDelDeviceVisible(true)}
            >
                Удалить устройство
                </Button>
                <DeleteBrand show={delBrandVisible} onHide={()=> setDelBrandVisible(false)}/>
            <DeleteDevice show={delDeviceVisible} onHide={()=> setDelDeviceVisible(false)}/>
            <DeleteType show={delTypeVisible} onHide={()=> setDelTypeVisible(false)}/>
            <Button 
                variant={"outline-dark"} 
                className="mt-3 p-3"
                onClick={()=> setUpdateDeviceVisible(true)}
            >
                Редактировать устройство
                </Button>
            <UpdateDevice show={updateDeviceVisible} onHide={()=> setUpdateDeviceVisible(false)}/>
        </Container>
        
    );
});


export default Admin;