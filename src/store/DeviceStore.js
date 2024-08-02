import {makeAutoObservable} from 'mobx';
import { ALL_DEVICE_COUNT} from '../utils/consts';

export default class DeviceStore{
    constructor(){
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedPrice = {min:0, max:9999999}
        this._info = {}
        this._selectedType = {}
        this._selectedBrand = {}
        this._maxId = 0
        this._page = 1
        this._totalCount = 0
        this._limit = ALL_DEVICE_COUNT
        makeAutoObservable(this)
    }



    setTypes(types){
        this._types = types
    }
    get types(){
        return this._types
    }

    setBrands(brands){
        this._brands = brands
    }
    get brands(){
        return this._brands
    }

    addDevice(device){
        this._devices.push(device)
    }
    get devices(){
        return this._devices
    }

    dellDevice(deviceId){
        this._devices.splice(deviceId,1)
    }
    setDevices(devices){
        this._devices = devices
    }
    setSelectedType(type){
        this.setPage(1)    
        this._selectedType = type
    }
    get selectedType(){
        return this._selectedType
    }
    
    setSelectedBrand(brand){
        this.setPage(1)
        this._selectedBrand = brand
    }
    get selectedBrand(){
        return this._selectedBrand
    }

    setPage(page){
        this._page = page
    }
    get page(){
        return this._page
    }

    setTotalCount(count){
        this._totalCount = count
    }
    get totalCount() {
        return this._totalCount
    }

    setidInfo(info){
        this._info = info
    }
    get info(){
        return  this._info
    }

    setMaxId(count){
        this._maxId = count
    }
    get maxId(){
        return this._maxId
    }

    setSelectedPrice(range){
        this.setPage(1)
        this._selectedPrice = range
    }
    get selectedPrice(){
        return this._selectedPrice
    }

    setAlldBrand(){
        this.setPage(1)
        this._selectedBrand = {}
    }
    setAllType(){
        this.setPage(1)
        this._selectedType= {}
    }

    setClear(){
        this._selectedType= {}
        this._selectedBrand = {}
        this._selectedPrice = {min:0, max:9999999}
    }









    get limit(){
        return this._limit
    }
}