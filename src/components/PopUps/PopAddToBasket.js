import React  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import {BASKET_ROUTE} from '../../utils/consts';
import './PopAddToBasket.css'

const PopAddToBasket = ({show, onHide}) => {
    const navigate = useNavigate();
    setTimeout(() => {
        onHide()
        show=false
      }, 300000)


    return (
    <div style={{position:'absolute'}}>
        <div 
            className='PopAddToBasket'
            style={show? {display:'block'} : {display:'none'}}
        >
            <div className='PopAddToBasket_text'>
                bolt
            </div>
            <button onClick={()=>navigate(BASKET_ROUTE)} className='PopAddToBasket_text'>
                Корзина
            </button>
        </div>
    </div>
    // <Modal
    //     show={show}
    //     onHide={onHide}
    //     scrollable={true}
    //     centered
    // >
    //     Добавить бренд
    //     <a onClick={()=>navigate(BASKET_ROUTE)}>Корзина</a>
    // </Modal>
    );
};

export default PopAddToBasket;