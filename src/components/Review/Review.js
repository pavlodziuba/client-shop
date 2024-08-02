import React, {useContext,useEffect,useState} from 'react';
import {Context} from "../../index";
import { Image,Row,Button } from 'react-bootstrap';
import CreateRewiew from '../models/CreateRewiew';
import EditRewiew from '../models/EditRewiew';
import DeleteRewiew from '../models/DeleteRewiew';
import star from '../../assets/Star2.png'
import trash_can from '../../assets/trash_can.png'
import './Review.css'
import { LOGIN_ROUTE} from '../../utils/consts';
import { useNavigate } from 'react-router-dom';

const Review = ({currentDeviceId,allRatings}) => {
    const {user} = useContext(Context)
    const [rewiewEditVisible, setRewiewEditVisible] = useState(false)
    const [rewiewEditCurentUser, setRewiewEditCurentUser] = useState(0)
    const [rewiewCreateVisible, setRewiewCreateVisible] = useState(false)
    const [rewiewDeleteVisible, setRewiewDeleteVisible] = useState(false)
    const [curentUserRating, setCurentUserRating] = useState(0)
    const navigate = useNavigate();

    const raiting = [0,1,2,3,4]

    function setDate(time){
        const res = new Date(Date.parse(time))
        return res.toLocaleDateString()
    }
    

    return (
        <Row className="d-flex flex-column m-3">
            <h2>Отзывы</h2>
                <Row className="d-flex align-items-center justify-content-center mt-4">
                    {user.isAuth ?
                            <div className='w-auto'>
                                <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>   
                            </div>  
                        :
                            <div className='w-auto'>
                                <Button
                                    variant={"outline-dark"} 
                                    className="mt-3 p-3"
                                    onClick={()=> setRewiewCreateVisible(true)}
                                >
                                    Оставить отзыв
                                </Button> 
                                <CreateRewiew show={rewiewCreateVisible} onHide={()=> setRewiewCreateVisible(false)} userId={user.userId} deviceId={currentDeviceId}/>  
                            </div>
                    }        
                </Row>
                    <EditRewiew 
                        show={rewiewEditVisible} 
                        onHide={()=> {setRewiewEditVisible(false)}} 
                        userId={rewiewEditCurentUser} 
                        curentUserRating={curentUserRating}
                        deviceId={currentDeviceId}
                    /> 
                    <DeleteRewiew 
                        show={rewiewDeleteVisible} 
                        onHide={()=> {setRewiewDeleteVisible(false)}} 
                        userId={rewiewEditCurentUser} 
                        deviceId={currentDeviceId}
                    />  
                <div className="p-0 m-0">
                {   
                allRatings.map((info, index) => 
                        info.userId == user.userId & info.deviceId == currentDeviceId?
                        <div key={index}>
                            <h5>Ваш отзыв</h5>
                            <div className="review-card">
                                    <div className="review-card__top">
                                        <div className="d-flex p-1">
                                            <div style={{fontSize:16, fontWeight:700,verticalAlign:'middle',textAlign:'center'}}>
                                                {info.name}
                                            </div>
                                            <div style={{marginLeft:10}}>
                                            <ul className="raiting-star-list">
                                                    {
                                                    raiting.map(index =>
                                                        index<info.rate?
                                                        <li key={index}>
                                                            <div className='raiting_star--active' style={{width:20,height:20}}></div>
                                                        </li>
                                                        :
                                                        <li key={index}>
                                                            <div className='raiting_star' style={{width:20,height:20}}></div>
                                                        </li>
                                                    )
                                                    }
                                                </ul>                                        
                                            </div>
                                        </div>
                                        <div className='d-flex' style={{alignItems:'center'}}>
                                            <div>
                                                {setDate(info.createdAt)}
                                            </div>
                                            <div>
                                                <Button
                                                    size='sm'
                                                    variant={"outline-success"} 
                                                    color='rgb(152, 162, 255)'
                                                    style={{marginLeft:20}}
                                                    onClick={()=> {
                                                        setCurentUserRating(info.rate)
                                                        setRewiewEditCurentUser(info.userId)
                                                        setRewiewEditVisible(true)
                                                    }}
                                                >
                                                Редактировать
                                                </Button>
                                                <Button 
                                                    size='sm'
                                                    variant={"outline-danger"} 
                                                    style={{marginLeft:10}}
                                                    onClick={()=> {
                                                        setRewiewEditCurentUser(info.userId)
                                                        setRewiewDeleteVisible(true)
                                                    }}
                                                >
                                                <Image className='mb-1' width={22} height={22} src={trash_can}/>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-1' style={{fontSize:14}}>
                                        {info.message}
                                    </div>
                                </div>
                        </div>
                        :
                        ''
                    )}
                </div>
                    
                <h5 className="p-0 m-0">Отзывы покупателей</h5>
                    {user.isADMIN  ?
                        allRatings.map((info, index) => 
                        info.userId != user.userId & info.deviceId == currentDeviceId?
                            <div key={index} className='m-0 p-0'>
                                <div className="review-card">
                                    <div className="review-card__top">
                                        <div className="d-flex p-1">
                                            <div style={{fontSize:16, fontWeight:700,verticalAlign:'middle',textAlign:'center'}}>
                                                {info.name}
                                            </div>
                                            <div style={{marginLeft:10}}>
                                                <ul className="raiting-star-list">
                                                    {
                                                    raiting.map(index =>
                                                        index<info.rate?
                                                        <li key={index}>
                                                            <div className='raiting_star--active' style={{width:20,height:20}}></div>
                                                        </li>
                                                        :
                                                        <li key={index}>
                                                            <div className='raiting_star' style={{width:20,height:20}}></div>
                                                        </li>
                                                    )
                                                    }
                                                </ul>                                         
                                            </div>
                                        </div>
                                        <div className='d-flex' style={{alignItems:'center'}}>
                                            <div>
                                                {setDate(info.createdAt)}
                                            </div>
                                            <div>
                                                <Button
                                                    size='sm'
                                                    variant={"outline-success"} 
                                                    color='rgb(152, 162, 255)'
                                                    style={{marginLeft:20}}
                                                    onClick={()=> {
                                                        setCurentUserRating(info.rate)
                                                        setRewiewEditCurentUser(info.userId)
                                                        setRewiewEditVisible(true)
                                                    }}
                                                >
                                                Редактировать
                                                </Button>
                                                <Button 
                                                    size='sm'
                                                    variant={"outline-danger"} 
                                                    style={{marginLeft:10}}
                                                    onClick={()=> {
                                                        setRewiewEditCurentUser(info.userId)
                                                        setRewiewDeleteVisible(true)
                                                    }}
                                                >
                                                <Image className='mb-1' width={22} height={22} src={trash_can}/>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex  flex-column">
                                        <div className='p-1' style={{fontSize:14}}>
                                                {info.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                        :
                        ''
                    )
                    :   
                    allRatings.map((info, index) => 
                        info.userId != user.userId & info.deviceId == currentDeviceId?
                        <div key={index} className='m-0 p-0'>
                            <div className="d-flex  flex-column justify-content-center mb-2" style={{borderRadius:5, padding: 10,border:1, borderStyle:'solid'}}>
                                <div className="d-flex justify-content-between" style={{borderBottom:1,borderBottomStyle:'solid'}}>
                                    <div className="d-flex p-1" style={{fontSize:16, fontWeight:700}}>
                                        {info.name}
                                        <div style={{marginLeft:10}}>
                                            <ul className="d-flex" style={{listStyle:'none',margin:0,padding:0}}>
                                                {
                                                raiting.map(index =>
                                                    index<info.rate?
                                                    <li  className='raiting_star--active' key={index}>
                                                        <Image  key={index} width={25} height={25} src={star}/>
                                                    </li>
                                                    :
                                                    <li  className='raiting_star' key={index}>
                                                        <Image  key={index} width={25} height={25} src={star}/>
                                                    </li>
                                                )
                                                }
                                            </ul>                                         
                                        </div>
                                    </div>
                                    <div>
                                        {setDate(info.createdAt)}
                                    </div>
                                </div>
                                <div className="d-flex  flex-column">
                                    <div className='p-1' style={{fontSize:14, wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
                                            {info.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        ''
                    )}
            </Row>
    );
};

export default Review;