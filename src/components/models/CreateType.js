import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form} from 'react-bootstrap';
import { useState } from 'react';
import { createType } from '../../http/deviceAPI';


const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')   

    const addType = () => {
        createType({name:value}).then(data=> setValue(''))
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
          Add type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Enter the name of the type"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Close</Button>
        <Button variant="outline-success" onClick={addType}>Add</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default CreateType;