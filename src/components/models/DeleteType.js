import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form} from 'react-bootstrap';
import { useState } from 'react';



const DeleteType = ({show, onHide}) => {
    const [value, setValue] = useState('')   

    const addType = () => {
        DeleteType({name:value}).then(data=> setValue(''))
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
          Удалить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Введите название типа"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addType}>Добавить</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default DeleteType;