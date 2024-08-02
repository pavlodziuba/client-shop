import React from 'react';
import {Container} from "react-bootstrap";
import {SHOP_ROUTE} from '../utils/consts';
import { NavLink } from "react-router-dom";
import { observer } from 'mobx-react-lite';





const Footer = observer(()=>{
   
    return(
        <div className='p-5 mt-5' style={{backgroundColor:'black', color:'white', fontWeight:'bold',fontSize:20}}>
            <Container className='d-flex justify-content-center'>
                <NavLink style={{color:'white', textDecoration:'none'}} to={SHOP_ROUTE}>MyShop 2022</NavLink>
            </Container>
        </div>
    );
});


export default Footer;
