import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState, Component} from 'react'
import Snake from './Snake';
import Food from './Food';



const getRandomCordinates = () =>{
  let min = 1;
  let max = 98
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
} 
const InitialState = {
  foodDot: getRandomCordinates(),
  direction: 'RIGTH',
  snakeDots: [
    [0,0],
    [2,0],
  ]
}
class App extends Component {
  
  state = InitialState
  componentDidMount(){
    setInterval(this.moveStake, 200);
    document.onkeydown = this.onkeyDown
  
  }
  componentDidUpdate(){
    this.checkifout();
/*     this.checkifCollapse(); */
    this.checkifEat();
  }
  checkifout () {
    let head= this.state.snakeDots[this.state.snakeDots.length -1];
    if(head[0] >=100  || head[1] >=100 || head[0] < 0 || head[1] < 0){
      this.onGameOver();
    }
  }
  checkifCollapse () {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length -1];
    snake.pop();
    snake.forEach((dot)=>{
      if(head[0] == dot[0] && head[1] == dot[1]){
        /* console.log("ciaio") */
        /* this.onGameOver(); */
      }
    })
  }
  checkifEat() {
    let head= this.state.snakeDots[this.state.snakeDots.length -1];
    let food = this.state.foodDot;
    if(head[0] == food[0] && head[1] == food[1]){
      this.setState({
        foodDot: getRandomCordinates()
      })
      this.enlargeSnake();
    }

  }
  enlargeSnake () {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake
    })
  }
  onGameOver() {
    alert(`Game Over`)
    this.setState(InitialState);
  }

  onkeyDown = (e) =>{
    e = e || window.event;
    switch(e.keyCode){
      case 38:
        this.setState({direction: 'UP'})
        break;
      case 40:
        this.setState({direction: 'DOWN'})
        break;
      case 37:
        this.setState({direction: 'LEFT'})
        break;
      case 39:
        this.setState({direction: 'RIGHT'})
        break;
    }
  }

  moveStake = () =>{
    
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length -1];
    switch(this.state.direction){
      case 'RIGHT':
        head =  [head[0]+2, head[1]];
        break;
      case 'LEFT':
        head =  [head[0]-2, head[1]];
        break;
      case 'DOWN':
        head =  [head[0], head[1]+2];
        break;
      case 'UP':
        head =  [head[0], head[1]-2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  } 
  
  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots} />
        <Food foodDot={this.state.foodDot} />
      </div>
    );
  }
  
}

export default App;
