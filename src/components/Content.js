import React from 'react';

class Content extends React.Component{
    constructor(props) {


        this.handleClick = this.handleClick.bind(this);
      }


      handleClick() {
        this.style.color= getRandomColorStyle() 
        function getRandom() {
            return Math.floor(Math.random() * 255);
        }
        function getRandomColorStyle() {
            return 'rgb(' + getRandom() + ',' + getRandom() + ',' +
                getRandom() + ')';
        }    
      }
      render() {
        return (
            <div>
                <p onClick={this.handleClick}>Хоббі</p>
            </div>
        );
      }
};

export default Content;

