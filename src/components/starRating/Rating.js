import React from 'react';
import './Rating.css'
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/consts';

const Rating = ({device,rewiewCount}) =>{
    const navigate = useNavigate();
    const rating = [0,1,2,3,4]
    return(
        <div className='text-black-50 d-flex justify-content-between align-items-center' style={{marginBottom:'8px'}}>
            <a className='rating-link' onClick={()=> navigate(DEVICE_ROUTE + '/' + device.id+'#review')} >
                <div className='d-flex align-items-left '>
                    <div className='d-flex' style={{fontSize:'12px'}}>
                        <ul className="raiting-star-list" style={{marginRight:'5px'}}>
                            {
                                rating.map(index =>
                                index<device.rating?
                                    <li  key={index}>
                                        <div  className='raiting_star--active' style={{width:12,height:12}}></div>
                                    </li>
                                    :
                                    <li key={index} >
                                        <div className='raiting_star' style={{width:12,height:12}}></div>
                                    </li>
                                )
                            }
                        </ul>
                        <span>
                            {/*
                            rewiewCount > 1 ? 
                                rewiewCount%10 >= 5 ? 
                                    <>{rewiewCount} Отзывов</>
                                    :
                                    <>{rewiewCount} Отзыва</>
                            :
                            rewiewCount%10 == 1 ?
                                <>{rewiewCount} Отзыв</>
                                :
                                <>Leave a review</>
                            */} 
                            {
                            rewiewCount > 1 ? 
                                rewiewCount%10 >= 5 ? 
                                    <>{rewiewCount} Review</>
                                    :
                                    <>{rewiewCount} Review</>
                            :
                            rewiewCount%10 == 1 ?
                                <>{rewiewCount} Review</>
                                :
                                <>Leave a review</>
                            } 
                        </span>
                    </div> 
                </div>                
            </a>

        </div>
    );
};


export default Rating;