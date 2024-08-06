import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {deleteDevice, fetchDevices,fetchTypes,fetchBrands} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import { ALL_DEVICE_COUNT} from '../../utils/consts';

const DeleteDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')


    const delDevice = () => {
        device.devices.map(device =>
            device.name === name ? deleteDevice(device.id) : ''
        )
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Remove the device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Enter the device name"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={delDevice}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteDevice;