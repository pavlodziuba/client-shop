import React  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form,Image} from 'react-bootstrap';
import { useState } from 'react';
import { getUserName} from '../../http/userAPI';
import { createRating } from '../../http/deviceAPI';
import star from '../../assets/Star2.png'

const CreateRewiew = ({show, onHide,userId,deviceId}) => {
    const [message, setMessage] = useState('')   
    const [userRating, setUserRating] = useState(0)  
    const [CurentUserRating, setCurentUserRating] = useState(0)
    const raiting = [0,1,2,3,4]

    const lighStarsOn = (index) => {
        const raitingList = document.getElementById('raiting_star_list')
        const tab = raitingList.querySelectorAll("li")
        while(index>=0){
            tab[index].classList.add('raiting_star--active')
            index--
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
    
    const addRating = () => {
        getUserName(userId).then(name => {
            createRating(userId,deviceId,message,userRating+1,name).then(data=>  setMessage(''))
        })
        onHide()
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
          Добавить отзыв
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <h5 style={{textAlign:'center'}}>Оцените товар</h5>                  
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
                maxLength = "200"
                value={message}
                onChange={e =>  setMessage(e.target.value)}
                placeholder={"Напишите отзыв"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHideAll}>Закрыть</Button>
        <Button variant="outline-success" onClick={addRating}>Добавить</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default CreateRewiew;