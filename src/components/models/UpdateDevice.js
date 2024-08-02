import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import { fetchOneDevice, updateDevice} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";   


const UpdateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [findName, setFindName] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [id, setId] = useState(0)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [deviceInfo, setDeviceInfo] = useState({info: []})
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setId(id+1)
        console.log(id)
        setInfo([...info, {title: '', description: '', id:Number(id) }])
    }
    const removeInfo = (id) => {
        setInfo(info.filter(i => i.id !== id))
    }
    const changeInfo = (key, value, id) => {
        console.log(info)
        setInfo(info.map(i => i.id === id? {...i, [key]: value} : i))
    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const findDevice = () => {
        device.devices.map(dev => {
            if(dev.name === findName){
                fetchOneDevice(dev.id).then(data => setDeviceInfo(data)).finally(() => setLoading(false))
                setInfo(deviceInfo.info)
                setId(device.maxId+1)

                device.types.map(type => {
                    if(dev.typeId == type.id){
                        device.setSelectedType(type)
                    } 
                })

                device.brands.map(brand => {
                    if(dev.brandId == brand.id){
                        device.setSelectedBrand(brand)
                    } 
                })

                setName(findName)

                setPrice(dev.price)
                

            } 
        })
    }
    
    const UpdateDevice = () => {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        device.devices.map(device =>{
            if(device.name === findName){
                updateDevice(formData, device.id)
            }
        })
        onHide()
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={findName}
                        onChange={e => setFindName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название для поиска устройства"
                    />
                    <div className='d-flex mt-3 align-items-center justify-content-end'>
                        <Button
                            variant={"outline-dark"}
                            onClick={findDevice}
                        >
                            Поиск
                        </Button> 
                    </div>
     
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(info =>
                        <Row className="mt-4" key={info.id}>
                            <Col md={4}>
                                <Form.Control
                                    value={info.title}
                                    onChange={(e) => changeInfo('title', e.target.value, info.id)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={info.description}
                                    onChange={(e) => changeInfo('description', e.target.value, info.id)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(info.id)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={UpdateDevice}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateDevice;