import './App.scss';
import { useEffect, useRef, useState } from 'react';

function App() {

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const countDownRef = useRef<number>();
  const [points, setPoints] = useState<number>(0);
  const [bombsHit, setBombsHit] = useState<number>(0);
  const [interval_, setInterval_] = useState<number>(800);

  const startGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    let gridItems = Array.from(document.getElementsByClassName('grid-item'));
    let items: string[] = ["mole", "bomb"];
    let button = e.target as HTMLInputElement;

    button.style.opacity="50%";
    button.style.pointerEvents="none";
    countDownRef.current = window.setInterval(()=>{
        let randomGrid = randomIntFromInterval(0, gridItems.length);
        gridItems.map((grid)=>{
          grid.innerHTML="";
        })

        gridItems[randomGrid].innerHTML=items[randomIntFromInterval(0, 1)];
    }, interval_)
  }

  const clickHandler = (e: React.MouseEvent<HTMLInputElement>): void => {
    let grid = e.target as HTMLInputElement;
    if(grid.innerHTML === "mole"){
      setPoints(points + 10);
      grid.innerHTML="";
    } else if(grid.innerHTML === "bomb"){
      setPoints(points - 10);
      grid.innerHTML="";
      setBombsHit(bombsHit+1);
    }
  }

  const reset = () => {
    let button = document.getElementById('startButton') as HTMLInputElement;
    let gridItems = Array.from(document.getElementsByClassName('grid-item'));
    clearInterval(countDownRef.current);
    (document.getElementById('difficulty') as HTMLInputElement).value='2';
    setInterval_(800);
    button.style.opacity="100%";
    button.style.pointerEvents="all";
    document.body.style.pointerEvents="all";
    setPoints(0);
    setBombsHit(0);
    gridItems.map((grid)=>{
      grid.innerHTML="";
    });
  }

  useEffect(()=>{
    if(bombsHit === 5){
      alert("You lost!");
      reset();
    }
  }, [bombsHit]);

  useEffect(()=>{
    if(points === 50){
      alert("You won!");
      reset();
    }
  }, [points]);

  const changeHandler = (e: { target: HTMLSelectElement; }) => {
    let difficulty = (e.target as HTMLSelectElement);
    let value = difficulty.value;
    reset();
    difficulty.value=value;
    if(difficulty.value === '1'){
      setInterval_(1000);
    } else if (difficulty.value === '2'){
      setInterval_(800);
    } else if (difficulty.value === '3'){
      setInterval_(500);
    }
  }

  return (
    <div className="App">
      <h2 className="points">Points: {points}</h2>
      <h2 className="bombsHit">Bombs Hit: {bombsHit}/5</h2>
      <h1>Wac-a-Mole</h1>
      <p>Score 50 points to win.</p>
      <p>Try not to hit more than 5 bombs.</p>
  <div id="grid-container" className="grid-container">
  <div className="grid-item" onClick={clickHandler}></div>
  <div className="grid-item" onClick={clickHandler}></div>
  <div className="grid-item" onClick={clickHandler}></div>  
  <div className="grid-item" onClick={clickHandler}></div>
  <div className="grid-item" onClick={clickHandler}></div>
  <div className="grid-item" onClick={clickHandler}></div>  
  <div className="grid-item" onClick={clickHandler}></div>
  <div className="grid-item" onClick={clickHandler}></div>
  <div className="grid-item" onClick={clickHandler}></div>  
  <div className="grid-item" onClick={clickHandler}></div>  
  <div className="grid-item" onClick={clickHandler}></div>  
  <div className="grid-item" onClick={clickHandler}></div>   
  </div>
  <br/>
  <button onClick={reset}>RESET</button>
  <button id="startButton" onClick={startGame}>START</button>
  <br/><br/><hr/>
  <div>
  <label>Difficulty</label>
  <br/>
  <select onChange={changeHandler} id="difficulty">
    <option value="1">Easy</option>
    <option value="2" selected>Normal</option>
    <option value="3">Hard</option>
  </select>
  </div>
  </div>
  );
}

export default App;