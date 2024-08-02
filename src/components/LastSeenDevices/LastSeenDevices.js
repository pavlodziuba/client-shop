import React, {useContext, useEffect,useState} from 'react';
import {Context} from "../../index";
import DeviceItem from '../DeviceList/DeviceItem';
import next_icon from '../../assets/slider_next_icon.svg'
import prev_icon from '../../assets/slider_prev_icon.svg'
import {fetchAllDevices,fetchRating} from "../../http/deviceAPI";
import { Carousel, CarouselItem, Image } from 'react-bootstrap';
import './LastSeenDevices.css';

const LastSeenDevices = () => {
    const {basket} = useContext(Context)
    const [devices,setDevice] = useState([])
    const [translateSlider, setTranslateSlider] = useState(0)
    const [maxSliderCounter, setMaxSliderCounter] = useState(-1)
    const [sliderCounterDots, setSliderCounterDots] = useState([])
    const [allRatings, setAllRatings]= useState([])
    const [onTouchStart, setOnTouchStart] = useState(0)
    const [currentTouchStart, setCurrentTouchStart] = useState(0)
    const [clientWidth, setClientWidth] = useState(0)
    window.onresize = reportWindowSize;

    useEffect(() => {
        checkWidth()
    },[devices,basket.lastSeenDevices])

    useEffect(() => {
        // Add all devices from DB in DeviceStorage user@gmail.com
        fetchAllDevices()
        .then(data => setDevice(data.rows))
        .then(()=>{
            fetchRating()
            .then(rating => setAllRatings(rating))
            checkWidth()
            setTimeout(() => {
                checkWidth()
              }, 100)
        })
     },[ basket.lastSeenDevices])

     function countReview(device){
        let count = 0
        allRatings.map(rate=>{
            if(rate.deviceId == device.id){
                count++
            }
        })
        return count
    }
    const setActiveButton = (dot) => {
        if(dot==-1){
            const sliderElemWidth = document.getElementById('last_seen_devices_item').scrollWidth
            const clientWidth = document.getElementById('last_seen_devices_list').clientWidth
            const countElemOnSlide = (maxSliderCounter/sliderElemWidth)/(maxSliderCounter/clientWidth)
            const currentTransformX  = Number((document.getElementById('last_seen_devices_list').style.transform).match(/\d*(?=px)/)[0])
            for (let i = 0; i < sliderCounterDots.length; i++) {
                if( currentTransformX == sliderElemWidth*countElemOnSlide*i){
                    dot=i
                }   
            }
        }
        if(dot != -1){
            for (let i = 0; i < sliderCounterDots.length; i++) {
                const otherButton = document.getElementsByClassName('slider-dots__button')[i]
                otherButton.classList.remove("slider-dots__button--active")
            }
            const curentButton = document.getElementsByClassName('slider-dots__button')[dot]
            curentButton.classList.add("slider-dots__button--active")            
        }
    }

    const checkWidth = () =>{
        const width = document.getElementById('last_seen_devices_list').scrollWidth
        const clientWidth = document.getElementById('last_seen_devices_list').clientWidth
        setClientWidth(clientWidth)
        setMaxSliderCounter(-(width-clientWidth))
        setSliderCounterDots([])
        let tempCounterDots = []
        for (let i = 0; i < Math.round(width/clientWidth); i++) {
            tempCounterDots.push(i)
        }
        setSliderCounterDots(tempCounterDots)
    }
    function reportWindowSize() {
        window.addEventListener('resize', checkWidth());
        setTranslateSlider(0)
        setActiveButton(0)
      }

    const animate = (count) =>{
        const slider = document.getElementById('last_seen_devices_list')
        slider.style.transition = `${clientWidth}ms`
        setTranslateSlider(count)
        setTimeout(() => {
            slider.style.transition = '0s'
            setActiveButton(-1)
          }, 251)
    }

    function goToNext(){
          animate(translateSlider-clientWidth)
    }

    function goToPrev(){
          animate(translateSlider+clientWidth)
    }
    function sliderButtonClick(dot){
        animate(-clientWidth*dot)
    }

    function touchMove(clientX){
        const move = currentTouchStart-(onTouchStart-clientX)
        const slider = document.getElementById('last_seen_devices_list')
        if(move<0 & maxSliderCounter<translateSlider+10){
            slider.style.transform = `translate3d(${move}px,0px,0px)`
            setTranslateSlider(move)
        }
    }

    function touchEnd(clientX){
        const sliderElemWidth = document.getElementById('last_seen_devices_item').scrollWidth
        const countElemOnSlide = (maxSliderCounter/sliderElemWidth)/(maxSliderCounter/clientWidth)
        const move = onTouchStart-clientX

        for (let i = 1; i < sliderCounterDots.length; i++) {
            if( -translateSlider > sliderElemWidth*countElemOnSlide*(i-1) &  -translateSlider < sliderElemWidth*countElemOnSlide*i){
                if(move>0){
                    if(move>50){
                        animate(-sliderElemWidth*countElemOnSlide*i) 
                    }else{  
                        animate(-sliderElemWidth*countElemOnSlide*(i-1))     
                    }
                }else{
                    if(move < -50){
                        animate(-sliderElemWidth*countElemOnSlide*(i-1))
                    }else{
                        animate(-sliderElemWidth*countElemOnSlide*i)
                    }    
                }

            }   
        }
        if(translateSlider<maxSliderCounter){
            animate(-sliderElemWidth*countElemOnSlide*(sliderCounterDots.length-1))
        }
    }

    return (
        <div className='uniq-slider'>
            <h1 className="mt-5 pb-2">Просмотренные товары</h1>
            <div  style={{position: 'relative'}}>
                <div style={{position: 'relative',width: '100%',overflow: 'hidden'}}>
                {translateSlider < 0 ?
                    <button
                        className="carousel-control-prev"
                        role="button"
                        onClick={()=> {
                            goToPrev()
                            checkWidth()
                        }}
                        style={{width:'5%'}}
                    >
                        <span aria-hidden="true">
                            <Image width={40} src={prev_icon}/>
                        </span>


                    </button >
                    :
                    <button
                        className="carousel-control-prev d-none"
                        role="button"
                        onClick={()=> {
                        }}
                        style={{width:'5%'}}
                    >
                        <span aria-hidden="true">
                            <Image width={40} src={prev_icon}/>
                        </span>
                    </button >
                }
                    <div  className='sleder-main'>
                    <ul id='last_seen_devices_list' className='last_seen_devices_list col-12 p-0 m-0' style={{transform: `translate3d(${translateSlider}px,0px,0px)`}}
                                onTouchStart={(e)=>{
                                    setOnTouchStart(e.changedTouches[0].clientX)
                                    setCurrentTouchStart(translateSlider)
                                }}
                                onTouchMove={(e)=> {
                                    touchMove(e.changedTouches[0].clientX,e)
                                }}
                                onTouchEnd={(e)=>{
                                    touchEnd(e.changedTouches[0].clientX)
                                }}
                    >
                        {
                        basket.lastSeenDevices.map(lastSeenId =>
                            devices.map(device =>
                                device.id == lastSeenId ?
                                <li id='last_seen_devices_item' key={lastSeenId} className={'col-6 col-md-4 col-lg-3 col-xl-2'} style={{height:'100%'}}>
                                    <DeviceItem style={{height:'10px'}} key={lastSeenId} devicee={device} small={12} lg={12} md={12} sm={12} rewiewCount={countReview(device)}/>
                                </li>
                                : ''
                            )
                        )
                        }
                    </ul>
                    </div>
                {maxSliderCounter < translateSlider-1 ?
                    <button
                        className="carousel-control-next"
                        role="button"
                        onClick={()=>{
                            goToNext()
                            checkWidth()
                        }}
                        style={{width:'5%'}}
                    >
                        <span aria-hidden="true">
                            <Image width={40} src={next_icon}/>
                        </span>


                    </button >
                    :
                    <button
                    className="carousel-control-next d-none"
                    role="button"
                    onClick={()=>{
                    }}
                    style={{width:'5%'}}
                >
                    <span aria-hidden="true">
                        <Image width={40} src={next_icon}/>
                    </span>


                </button >
                }
                </div>
            </div>
            <div className='simple-slider__footer'>
                <ul  className='slider-dots' style={{display:'flex', listStyle:'none',maxWidth:'100%'}}>
                        {
                            sliderCounterDots.map(dot=>
                                dot == 0?
                                <li key={dot}>
                                    <button
                                        key={dot}
                                        type="button"
                                        className='slider-dots__button slider-dots__button--active'
                                        onClick={()=> {
                                            sliderButtonClick(dot)
                                            setActiveButton(dot)
                                        }}
                                    />
                                </li>
                                :
                                <li key={dot}>
                                    <button
                                        key={dot}
                                        type="button"
                                        className='slider-dots__button'
                                        onClick={()=> {
                                            sliderButtonClick(dot)
                                            setActiveButton(dot)
                                        }}
                                    />
                                </li>
                            )
                        }
                </ul>
            </div>
        </div>
    );
};

export default LastSeenDevices;