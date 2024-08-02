import {makeAutoObservable} from 'mobx';

export default class CompareStore{
    constructor(){
        this._compares = {}
        this._comparesInfos = []
        makeAutoObservable(this)
    }

    setComparesEmpty(){
        this._compares = {}
    }

    setCompares(compares){
        this._compares = compares
    }
    setComparesInfosEmpty(){
        this._comparesInfos =[]
    }
    addComparesInfos(info){
        this._comparesInfos.push(info)
    }

    get comparesInfos(){
        return this._comparesInfos
    }

    get compares(){
        return this._compares
    }

}