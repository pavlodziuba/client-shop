import React  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form,Image} from 'react-bootstrap';
import { useState } from 'react';
import { editRating,fetchRating, setRatingForDevice} from '../../http/deviceAPI';
import star from '../../assets/Star2.png'
import { observer } from 'mobx-react-lite';


const EditRewiew = observer(({show, onHide,userId,deviceId,curentUserRating}) => {
    const [message, setMessage] = useState('')    
    const [userRating, setUserRating] = useState(0)  
    const [CurentUserRating, setCurentUserRating] = useState( Number(curentUserRating))
    const raiting = [0,1,2,3,4]


    const lighStarsOn = (index) => {
        lighStarsOff()
        const raitingList = document.getElementById('raiting_star_list')
        const tab = raitingList.querySelectorAll("li")
        while(index>=0){
            tab[index].classList.add('raiting_star--active')
            index--
        }
    }

    const curentUserRatingLight = () => {
        lighStarsOff ()
        const raitingList = document.getElementById('raiting_star_list')
        const tab = raitingList.querySelectorAll("li")
        let i =CurentUserRating-1
        while(i>=0){
            tab[i].classList.add('raiting_star--active')
            i--
        }
    }
    
    const lighStarsOff = () => {
        const raitingList = document.getElementById('raiting_star_list')
        const tab = raitingList.querySelectorAll("li")
        let i = 4
        while(i>=0){
            tab[i].classList.remove('raiting_star--active')
            i--
        }
    }
    const updateRating = () => {
        editRating(userId,deviceId,message,userRating+1).then(
            fetchRating().then(allRating=> {
                console.log(allRating)
                let allRate = 0;
                let countRate = 0;
                allRating.forEach(i => {
                    allRate = allRate +i.rate 
                    countRate = countRate + 1
                })
                const newRating = allRate/countRate;
                setRatingForDevice(deviceId,newRating)
            }).finally(data=>  setMessage(''))
        )
        onHideAll()
    }
    const onHideAll = () => {
        setCurentUserRating(0)
        setUserRating(0)
        setMessage('')
        onHide()
    }
    return (
        <Modal
            show={show}
            onHide={onHideAll}
            centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit your review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <h5 style={{textAlign:'center'}}>Rate the product</h5>    
            <div className="d-flex align-items-center justify-content-center p-0">
                <ul id='raiting_star_list' className="d-flex p-0" style={{listStyle:'none',maxWidth:'125px'}} onMouseLeave={()=> curentUserRatingLight()}>
                    {
                        raiting.map(index =>
                            index<CurentUserRating?
                            <li  className='raiting_star--active' key={index}>
                                <Image  key={index} width={25} height={25} src={star} onClick={()=> {
                                    setUserRating(index)
                                    setCurentUserRating(index + 1)
                                    }} onMouseEnter={()=> lighStarsOn(index)} onMouseOut={()=> lighStarsOff()}/>
                            </li>
                            :
                            <li  className='raiting_star' key={index}>
                                <Image  key={index} width={25} height={25} src={star} onClick={()=> {
                                    setUserRating(index)
                                    setCurentUserRating(index + 1)
                                    }} onMouseEnter={()=> lighStarsOn(index)} onMouseOut={()=> lighStarsOff()}/>
                            </li>
                        )
                    }
                </ul>  
            </div>              
            <Form.Control 
                maxLength={254}
                value={message}
                onChange={e =>  setMessage(e.target.value)}
                placeholder={"Edit the review"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHideAll}>Close</Button>
        <Button variant="outline-success" onClick={updateRating}>Edit</Button>
      </Modal.Footer>
    </Modal>
    );
});

export default EditRewiew;