import React  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import { useState } from 'react';
import { createBrand } from '../../http/deviceAPI';

const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')   

    const addBrand = () => {
        createBrand({name:value}).then(window.location.reload())
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
          Add brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Enter brand name"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Close</Button>
        <Button variant="outline-success" onClick={addBrand}>Add</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default CreateBrand;