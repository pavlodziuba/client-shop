import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/Star 1.png'
import star from '../assets/Star2.png'
import {useLocation, useParams} from 'react-router-dom'
import {addBasketDevice, fetchOneDevice,createSeenBasketDevices,fetchBasketDevices,fetchRating} from "../http/deviceAPI";
import {Spinner} from "react-bootstrap";
import {Context} from "../index";
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, BASKET_ROUTE } from '../utils/consts';
import {useDispatch} from 'react-redux'
import { observer } from 'mobx-react-lite';
import LastSeenDevices from "../components/LastSeenDevices/LastSeenDevices";
import './DevicePage.css'
import Review from '../components/Review/Review';


const DevicePage = observer(() => {
    const { pathname, hash, key } = useLocation();
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const [inBusketOnPage, setInBusketOnPage] = useState(false)
    const [loading, setLoading] = useState(true)
    const [device, setDevice] = useState({info: []})
    const [allRatings, setAllRatings]= useState([])
    const {id} = useParams()
    const dispatch = useDispatch() 
    const navigate = useNavigate();
    useEffect(() => {
        if (hash === '') {
          window.scrollTo(0, 0);
        }
        else {
          setTimeout(() => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView();
            }
          }, 200);
        }
      }, [pathname, hash, key]);
        //Fetch current Device
    useEffect(() => {
        fetchOneDevice(id)
        .then(data => {
            //set info about current device
            setDevice(data)

            //set raiting for current device
            setCurrentRaiting()
            
            //device to lastSeenDevices for current device
            addSeenBasketDevices(data)
            
            basket.baskets.some(basketItem => {
                if(basketItem.deviceId == data.id){
                    setInBusketOnPage(true)
                    return basketItem
                }else{
                    setInBusketOnPage(false)
                } 
            })
        })
        .finally(() => {
            setLoading(false)
        })
    }, [id,basket.baskets,device.rating])

    const animateBasketIcon = () => {
        const jumpIcon = document.getElementById('nav_buy_icon')  
        jumpIcon.classList.add('animate');
        setTimeout(() => {
            jumpIcon.classList.remove('animate');
          }, 400)
    }

    const changeBasketlNum = () => {
        if(user.isAuth){
            fetchBasketDevices(user.userId)
            .then(data => {
                animateBasketIcon()
                dispatch({type:"CHANGE_BASKET_NUM", payload:data.length})  
                basket.setBasket(data)
            })  
        }
    }

    function setCurrentRaiting(){
        fetchRating().then(rating => setAllRatings(rating))
    }

    function addSeenBasketDevices(data){
        if(user.isAuth){
            createSeenBasketDevices(user.userId,data.id)
        }
        basket.setLastSeenDevices(data.id)
    }

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    //Buy button 
    const addItemToBasket = () => {
        if(user.isAuth){
            const formData = new FormData()
            formData.append('basketId', `${user.userId}`)
            formData.append('deviceId', `${device.id}`)
            addBasketDevice(formData).then(() => changeBasketlNum())
            setInBusketOnPage(true)
        }else{
            alert('Sign in!')
             navigate(LOGIN_ROUTE)
        }
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">                  
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{device.price} $</h3>
                        {
                        inBusketOnPage ? 
                            <Button variant={"success"} onClick={()=> navigate(BASKET_ROUTE)}>Already in the cart</Button>
                        :
                            <Button variant={"outline-dark"} onClick={addItemToBasket}>Add to cart</Button>
                        }
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
            <h2>{device.name}</h2>
                <h1>Specifications</h1>
                {device.info.map((info, index) => 
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
            <div id='review'></div>
            <Review currentDeviceId={id} allRatings={allRatings}/>
            <LastSeenDevices />
        </Container>
    );
});

export default DevicePage;