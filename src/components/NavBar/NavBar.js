import React, { useContext, useEffect } from 'react';
import { Context } from '../../index';
import buy_icon from '../../assets/buy_icon.png'
import scales from '../../assets/scales.png'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import {Container, Image} from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE,COMPARE_ROUTE } from '../../utils/consts';
import { NavLink } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import './NavBar.css'



const NavBar = observer(()=>{
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const {device} = useContext(Context)
    const navigate = useNavigate();

    const basket_num = useSelector(state => state.basketNum)
    const compare_num = 0

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setUserId(0)
        basket.setLastSeenDevicesEmpty([])
        basket.setBasket([])
        device.setClear()
        device.setDevices([])
        localStorage.removeItem('token')
        navigate(SHOP_ROUTE) 
    }
    
    return(
        <header className="navbar sticky-top navbar-dark bg-dark" bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>MyShop</NavLink>
                {user.isAuth ?
                    user.isADMIN ? 
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        {
                            compare_num > 0 ? <Button variant={"light"} onClick={() => navigate(COMPARE_ROUTE)}>
                                <div  className='d-flex justify-content-between'>
                                    <Image id='nav_scales_icon' width={'100%'} style={{maxHeight: 30}} src={scales}/>
                                    <div style={{marginLeft:4,marginBottom:20}}>
                                        <span style={{backgroundColor:'green',padding:2, borderRadius:5, fontSize:14, fontWeight: 'bold',marginLeft:1,marginTop:-10, position:'absolute',height:30}}>
                                            {compare_num}
                                        </span>
                                    </div>  
                                </div>     
                            </Button> 
                        : 
                            <Button variant={"outline-light"} style={{backgroundColor:'#3A3A3A'}} onClick={() => navigate(COMPARE_ROUTE)}>
                                <div className='d-flex justify-content-between'>
                                    <Image id='nav_scales_icon' width={'100%'} style={{filter: 100, maxHeight: 30}} src={scales}/>
                                </div>     
                            </Button> 
                        }  
                        {
                            basket_num > 0 ? <Button className='nav_buy_button' variant={"light"} onClick={() => navigate(BASKET_ROUTE)}>
                                <div className='d-flex justify-content-between'>
                                    <Image id='nav_buy_icon' width={'100%'} style={{maxHeight: 30}} src={buy_icon}/>
                                    <div style={{marginLeft:4,marginBottom:20}}>
                                        <span style={{backgroundColor:'green',padding:2, borderRadius:5, fontSize:14, fontWeight: 'bold',marginLeft:1,marginTop:-10, position:'absolute',height:30}}>
                                            {basket_num}
                                        </span>
                                    </div>  
                                </div>     
                            </Button> 
                        : 
                            <Button className='nav_buy_button' variant={"outline-light"} style={{backgroundColor:'#3A3A3A'}} onClick={() => navigate(BASKET_ROUTE)}>
                                <div className='d-flex justify-content-between'>
                                    <Image id='nav_buy_icon' width={'100%'} style={{filter: 100, maxHeight: 30}} src={buy_icon}/>
                                </div>     
                            </Button> 
                        }  
                        <Button className="ml-2" variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>    
                        <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>    
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        {
                            compare_num > 0 ? <Button variant={"light"} onClick={() => navigate(COMPARE_ROUTE)}>
                                <div  className='d-flex justify-content-between'>
                                    <Image id='scales' width={'100%'} style={{maxHeight: 30}} src={scales}/>
                                    <div style={{marginLeft:4,marginBottom:20}}>
                                        <span style={{backgroundColor:'green',padding:2, borderRadius:5, fontSize:14, fontWeight: 'bold',marginLeft:1,marginTop:-10, position:'absolute',height:30}}>
                                            {compare_num}
                                        </span>
                                    </div>  
                                </div>     
                            </Button> 
                        : 
                            <Button variant={"outline-light"} style={{backgroundColor:'#3A3A3A'}} onClick={() => navigate(COMPARE_ROUTE)}>
                                <div className='d-flex justify-content-between'>
                                    <Image id='scales' width={'100%'} style={{filter: 100, maxHeight: 30}} src={scales}/>
                                </div>     
                            </Button> 
                        }  
                        {
                            basket_num > 0 ? <Button className='nav_buy_button' variant={"light"} onClick={() => navigate(BASKET_ROUTE)}>
                                <div  className='d-flex justify-content-between'>
                                    <Image id='nav_buy_icon' width={'100%'} style={{maxHeight: 30}} src={buy_icon}/>
                                    <div style={{marginLeft:4,marginBottom:20}}>
                                        <span style={{backgroundColor:'green',padding:2, borderRadius:5, fontSize:14, fontWeight: 'bold',marginLeft:1,marginTop:-10, position:'absolute',height:30}}>
                                            {basket_num}
                                        </span>
                                    </div>  
                                </div>     
                            </Button> 
                        : 
                            <Button className='nav_buy_button' variant={"outline-light"} style={{backgroundColor:'#3A3A3A'}} onClick={() => navigate(BASKET_ROUTE)}>
                                <div className='d-flex justify-content-between'>
                                    <Image id='nav_buy_icon' width={'100%'} style={{filter: 100, maxHeight: 30}} src={buy_icon}/>
                                </div>     
                            </Button> 
                        }  
                        <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>    
                    </Nav>
                :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                    <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>    
                    </Nav>
                }
            </Container>
        </header >
    );
});


export default NavBar;
