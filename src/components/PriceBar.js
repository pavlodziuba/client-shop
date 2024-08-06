import { Context } from '../index';
import React , { useContext, useEffect} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button, Form, ListGroup, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';



const PriceBar = observer(() => {
    const {device} = useContext(Context)
    const [value, setValue] = useState([1, 180000]);
    const [minValue, setMinValue]  = useState(0)
    const [maxValue, setMaxValue] = useState(0)
 
    useEffect(() => {   
        setMinValue(0)
        setMaxValue(99999)
        value[0] = 0
        value[1] = 99999
    }, [device.selectedType])    
      
    const handleChange = (event, newValue) => {
      setValue(newValue);
      setMinValue  (Number(newValue[0]))
      setMaxValue  (Number(newValue[1]))
    };


    return (
        <ListGroup className='mt-3'>
                <ListGroup.Item
                    style={{borderColor:'rgb(152, 162, 255)'}}
                    className='mb-2 align-items-center justify-content-center' 
                >   
                    <div style={{textAlign:'center'}}><p><strong>Price range</strong></p></div>
                    <div className="d-flex">
                        <input 
                            min = {0}
                            className='price-bar-input'
                            value={minValue}
                            onChange={e => {
                                setMinValue(Number(e.target.value))
                                value[0] = Number(e.target.value)
                            }}
                            type='number'
                        ></input> 
                        <span className="slider-filter__divider"> — </span>
                        <input 
                            min = {0}
                            border={'solid'}
                            className='price-bar-input'
                            value={maxValue}
                            onChange={e =>{ 
                                setMaxValue(Number(e.target.value))
                                value[1] = Number(e.target.value)
                            }}
                            type='number'
                        ></input>
                    </div>

                    <Box sx={{ width: '100%'}}>   
                        <Slider
                            value={value}
                            max={99999}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                        />


                </Box>
                <Button
                    style={{backgroundColor:'rgb(152, 162, 255)'}}
                    onClick={() => device.setSelectedPrice({min:value[0], max:value[1]})}
                >
                    Search
                </Button>
            </ListGroup.Item>
        </ListGroup>

    );
});

export default PriceBar;


