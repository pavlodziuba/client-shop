import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';
import BasketStore from './store/BasketStore';
import CompareStore from './store/CompareStore';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

export const Context = createContext(null)

const initialState = {
  col: 3,
  basketNum:0
}



function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_COL_NUM':
      return {
        ...state, 
        col: action.payload
      }
    case 'CHANGE_BASKET_NUM':
      return {
        ...state,   
        basketNum: action.payload
      }
    default: 
      return state
  }
}

let store = createStore(counterReducer)


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <Context.Provider value={{
      user: new UserStore(),
      basket: new BasketStore(),
      device: new DeviceStore(),
      compare: new CompareStore()
    }}>
      <Provider store ={store}>
        <App />
      </Provider>
        
    </Context.Provider>

);


