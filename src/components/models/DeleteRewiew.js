import React  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import {deleteRating,fetchRating,setRatingForDevice} from '../../http/deviceAPI';

const DeleteRewiew = ({show, onHide,userId,deviceId}) => { 


    const DeleteRating = () => {
        onHide()
        deleteRating(deviceId,userId)
        fetchRating().then(allRating => {
          console.log(allRating)
          let allRate = 0;
          let countRate = 0;
          allRating.forEach(i => {
              allRate = allRate +i.rate 
              countRate = countRate + 1
          })
          const newRate = allRate/countRate
          countRate === 0 ? setRatingForDevice(deviceId,0) : setRatingForDevice(deviceId,newRate)
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <h4 style={{textAlign:'center'}}>Are you sure you want to remove the review?</h4>                  
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Close</Button>
        <Button variant="outline-success" onClick={DeleteRating}>Delete</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default DeleteRewiew;