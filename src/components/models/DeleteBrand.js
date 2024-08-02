import React, { useContext }  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import {Context} from "../../index";
import { useState } from 'react';
import { deleteBrand  } from '../../http/deviceAPI';

const DeleteBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')   
    const {device} = useContext(Context)


    //Удалить все устройства бренда?
    const dellBrand = () => {
      console.log(value)
      device.brands.map(brand => {
        if(brand.name === value ){
          deleteBrand(brand.id)
        }
      })
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
          Удалить бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Введите название бренда"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={dellBrand}>Удалить</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default DeleteBrand;