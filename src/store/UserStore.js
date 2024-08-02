import {makeAutoObservable} from 'mobx';

export default class UserStore{
    constructor(){
        this._isAuth = false
        this._user = {}
        this._isADMIN = false
        this._userId = 0
        makeAutoObservable(this)
    }


    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user){
        this._user = user
    }
    setUserId(id){
        this._userId = id
    }
    setADMIN(){
        this._isADMIN = true
    }

    get userId(){
        return this._userId
    }
    get isADMIN(){
        return this._isADMIN
    }

    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }
}