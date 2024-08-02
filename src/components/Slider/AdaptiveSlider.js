import React, {useEffect,useState} from 'react';
import next_icon from '../../assets/slider_next_icon.svg'
import prev_icon from '../../assets/slider_prev_icon.svg'
import { Carousel, CarouselItem, Image } from 'react-bootstrap';
import './AdaptiveSlider.css';

const LastSeenDevices = ({elementsArr}) => {

    const [translateSlider, setTranslateSlider] = useState(0)
    const [maxSliderCounter, setMaxSliderCounter] = useState(-1)
    const [sliderCounterDots, setSliderCounterDots] = useState([])

    function countReview(device){
        let count = 0
        allRatings.map(rate=>{
            if(rate.deviceId == device.id){
                count++
            }
        })
        return count
    }
    
    useEffect(() => {
        setTimeout(() => {
            checkWidth()
          }, 100)
     },[ ])  

    const setActiveButton = (dot) => {
        for (let i = 0; i < sliderCounterDots.length; i++) {
            const otherButton = document.getElementsByClassName('slider-dots__button')[i]
            otherButton.classList.remove("slider-dots__button--active")     
        }
        const curentButton = document.getElementsByClassName('slider-dots__button')[dot]
        curentButton.classList.add("slider-dots__button--active")
    }

    const checkWidth = () =>{
        const width = document.getElementById('last_seen_devices_list').scrollWidth 
        const clientWidth = document.getElementById('last_seen_devices_list').clientWidth
        setMaxSliderCounter(-(Math.round(width/clientWidth)*100)+100)
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
    window.onresize = reportWindowSize;

    return (
        <div>
            <Carousel
                controls={false}
                indicators={false}
                interval={null}
            >
                {translateSlider !=0 ? 
                    <a 
                        className="carousel-control-prev" 
                        role="button"   
                        onClick={()=> {
                            setTranslateSlider(translateSlider+100)
                            setActiveButton(Math.abs(translateSlider+100)/100)
                            checkWidth()
                        }} 
                        style={{width:'5%'}}
                    >
                        <span  aria-hidden="true">
                            <Image width={40} src={prev_icon}/>
                        </span>
                    </a>
                    : ''
                }
                    <CarouselItem  style={{display:'flex',transform: `translate3d(${translateSlider}%,0px,0px)`,transitionDuration:'374ms'}}>
                    <ul className='col-12 p-0 m-0' style={{display:'flex', listStyle:'none'}} onTouchMove={()=> console.log(s)}>
                        {
                        elementsArr.map((element,index) =>
                                <li key={index} className={'col-6 col-md-4 col-lg-3 col-xl-2'} style={{height:'100%'}}>
                                    <DeviceItem style={{height:'10px'}} key={lastSeenId} devicee={device} small={12} lg={12} md={12} sm={12} rewiewCount={countReview(device)}/>
                                </li>
                            )
                        }  
                    </ul>
                    </CarouselItem>
                {maxSliderCounter!=translateSlider ?    
                    <a  
                        className="carousel-control-next" 
                        role="button"  
                        onClick={()=>{
                            setTranslateSlider(translateSlider-100)
                            setActiveButton(Math.abs(translateSlider-100)/100)
                            checkWidth()
                        }} 
                        style={{width:'5%'}}
                    
                    >
                        <span  aria-hidden="true">
                            <Image width={40} src={next_icon}/>
                        </span>
                    </a>
                    :''
                }
            </Carousel>
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
                                            setTranslateSlider(-100*dot)
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
                                            setTranslateSlider(-100*dot)
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