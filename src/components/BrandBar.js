import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import React , { useContext} from 'react';
import { Card, Row } from 'react-bootstrap';

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    let selectedBrand = false;
    device.selectedBrand.id > 0 ? selectedBrand = true : selectedBrand = false

    return (
        <Row className="d-flex">
            {
                <Card
                    style={{width:"auto", cursor: 'pointer'}}
                    className="p-3"
                    border={ selectedBrand ? 'light' : 'success'}
                    onClick={() => device.setAlldBrand()}
                    >
                    All brands        
                </Card>               
            }
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    style={{width:"auto", cursor: 'pointer'}}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={ brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>    
            )}
        </Row>
    );
});

export default BrandBar;

