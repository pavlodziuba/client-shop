import {makeAutoObservable} from 'mobx';

export default class BasketStore{
    constructor(){
        this._baskets = []
        this._lastSeenDevices = []
        makeAutoObservable(this)
    }


    setLastSeenDevices(deviceId){
        if(this._lastSeenDevices.length > 11){
            if(this._lastSeenDevices.includes(deviceId)){
                this._lastSeenDevices.splice(this._lastSeenDevices.indexOf(deviceId),1)
                this._lastSeenDevices.splice(0,0,deviceId)
            }else{
                this._lastSeenDevices.splice(11,1)
                this._lastSeenDevices.splice(0,0,deviceId)
            }
        }else{
            if(this._lastSeenDevices.includes(deviceId)){
                this._lastSeenDevices.splice(this._lastSeenDevices.indexOf(deviceId),1)
                this._lastSeenDevices.splice(0,0,deviceId)
            }else{
                this._lastSeenDevices.splice(0,0,deviceId)
            }
        }
    }
    get lastSeenDevices(){
        return this._lastSeenDevices
    }

    setLastSeenDevicesEmpty(){
        this._lastSeenDevices = []
    }

    setBasket(basket){
        this._baskets = basket
    }

    get baskets(){
        return this._baskets
    }

}