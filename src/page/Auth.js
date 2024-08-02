import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import {Card, Container, Form ,Button,Row  } from 'react-bootstrap'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { registration, login } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';
import {check} from "../http/userAPI";


const Auth = observer(() =>{
    const {user} = useContext(Context)
    const location = useLocation()
    const navigation = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const SignIn = async () => {
        try{    
            if(isLogin){
                await login(email, password).then(() => {
                    check().then(data => {
                        if(data.role === 'ADMIN'){
                             console.log(data.role)
                             user.setADMIN(true)
                        }
                        user.setUserId(data.id)
                        user.setUser(true)
                        user.setIsAuth(true)
                    })
                    //window.location.href = SHOP_ROUTE;
                    navigation(SHOP_ROUTE)
                })
                
            }else{
                await registration(email, password)
            }
        }catch(e){
            alert(e.response.data.message)
        }
        
    }

    
    return(
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight -54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    {isLogin ? 
                        <div>
                             Нет акаунта? <NavLink to = {REGISTRATION_ROUTE}>Зарегестрируйтесь!</NavLink>
                        </div>
                        :
                        <div>
                            Есть акаунт? <NavLink to = {LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                    }
                        <Button  
                            variant ={"outline-success"}
                            onClick = {SignIn}
                        >
                        {isLogin ?  "Войти" : "Регистрация"}
                        </Button>                        
                    </Row>

                </Form>
            </Card>
           
        </Container>
    );
});


export default Auth;