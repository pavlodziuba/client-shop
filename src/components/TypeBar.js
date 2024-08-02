import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import React , { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    let selectedType= false;
    if(device.selectedType.id > 0){
        selectedType = true
    } 
    return (
        <ListGroup>
            {
                <ListGroup.Item
                    className='mb-2' 
                    variant={ (device.selectedType.id == undefined) && (device.selectedBrand.id == undefined) && (device.selectedPrice.max ===9999999)  ?  'light': 'danger'}
                    style={{cursor: 'pointer', border:'1px solid red'}}
                    onClick={() => device.setClear()}
                >
                    Сбросить фильтры
                </ListGroup.Item>            
            }
           {
                <ListGroup.Item
                    className='mb-2' 
                    style={{cursor: 'pointer', border:'1px solid green'}}
                    active={selectedType ? false : true}
                    onClick={() => device.setAllType()}
                >
                    Все категории
                </ListGroup.Item>            
            }
            {device.types.map(type =>
                <ListGroup.Item 
                    style={{cursor: 'pointer'}}
                    active={type.id === device.selectedType.id}
                    onClick={() =>{ device.setSelectedType(type)}}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;