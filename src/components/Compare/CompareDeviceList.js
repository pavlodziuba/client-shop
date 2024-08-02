import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import React , { useContext } from 'react';
import { Image, Row } from 'react-bootstrap';
import CompareDeviceItem from "./CompareDeviceItem";

const CompareDeviceList = observer(() => {
    const {device} = useContext(Context)
    const {compare} = useContext(Context)

    return (
        <Row className="d-flex">
            {
                device.devices.map((device) => 
                        <CompareDeviceItem key={device.id} devicee={device} info={compare.comparesInfos}/>
                )
            }
        </Row>

    );
});

export default CompareDeviceList;
