import { useEffect, useState, useContext } from "react"
import Modal from "../Modal"
import { Link } from "react-router-dom"
import { Cardcontext } from "./context"
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()
export default function Box() {
  const { setDifficulty, chosenLevel, Boxarr, setBoxArr, isModalOpen, setIsModalOpen,
  selected, setSelected, win, setWin, flip} = useContext(Cardcontext)
  
  const level = chosenLevel == 'easy' ? 80 : chosenLevel == 'medium' ? '60' :
  chosenLevel == 'hard' ? '40' : ''
  const [timer, setTimer] = useState(level)
  
  useEffect(() => {
    if (win == false) {
      if (isModalOpen == false) {
        if (timer >= 0) {
          const timeInterval = setInterval(() => {
            setTimer(oldData => {
              const newNum = oldData - 1
              return newNum >= 0 ? newNum : 0
            })
          }, 1000);
          return () => clearInterval(timeInterval)
        }
      }
    }
  }, [isModalOpen, win])
  const boxElem = Boxarr.map((data, index) => {
    return <div onClick={(e) => flip(e, data)} key={index} id={data.id} style={{
      backgroundColor: data.isMatched ? 'green' : 'red', height: '100px',
      transform: selected.some(info => info.id == data.id) ? 'rotateX(180deg)' : '',
      transition: data.isMatched ? '9s ease-in-out' : '2s ease-in-out',
      cursor: 'pointer',
      position: 'relative',
      opacity: data.isMatched ? '0' : 1
    }}><p style={{
      opacity: selected.some(info => info.id == data.id) ? '1' : '0',
      transition: '3s ease-in-out', position: 'absolute', transform: 'rotateX(180deg)', textAlign: 'center',
      top: data.id == '8' || data.id == '7' ? '20%' : '40%', left: data.id == '8' || data.id == '7' ? '0px' : '25%',
      fontSize: '15px', fontWeight: 'bold', textShadow: ' 0 0 10px rgba(0, 0, 0, 0.5)', pointerEvents: 'none',
         
        
    }}>{data.name}</p></div>
  })
  
  useEffect(() => {
    console.log(Boxarr)
    const allChecked = Boxarr.every(data => data.isMatched == true)
    if (allChecked) { setWin(true); jsConfetti.addConfetti() }
    else {setWin(false)}
    const [firstCard, secondCard] = selected
    for (let i = 0; i < selected.length; i++) {
      if (firstCard && secondCard ? firstCard.name != secondCard.name: '') {
        setTimeout(() => setSelected([]), 2000)
      }
      else if (firstCard.id == secondCard.id) { setSelected([]) }
      else {
        setTimer(oldValue => oldValue + 10)
        setBoxArr((prevBoxArr) => {
          const updatedBoxArr = prevBoxArr.map((data) =>
            data.name === firstCard.name ? { ...data, isMatched: true } : data
          );
          return updatedBoxArr;
        });
        setTimeout(() => {
          setSelected([]);
        }, 2000);
      }
    }
  }, [selected.length == 2])
  let timeIndicator
  if (chosenLevel == 'hard') {
    if (timer < 20 && timer > 10) {
   timeIndicator = 'yellow' 
    }   
    else if (timer <= 10) {
    timeIndicator = 'red'  
    }
    else {
     timeIndicator = 'green' 
    }
  }
  else if (chosenLevel == 'medium') {
     if (timer < 20 && timer > 10) {
   timeIndicator = 'yellow' 
    }   
    else if (timer <= 10) {
    timeIndicator = 'red'  
    }
    else {
     timeIndicator = 'green' 
    } 
  }
  else if (chosenLevel == 'easy') {
     if (timer < 40 && timer > 15) {
   timeIndicator = 'yellow' 
    }   
    else if (timer <= 15) {
    timeIndicator = 'red'  
    }
    else {
     timeIndicator = 'green' 
    } 
    }
  
  return <div style={{
    overflow: 'hidden'
  }} className="bg-dark vh-100 vw-100" ><Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
     <span style={{
      width: `${timer}%`, height: '10px', backgroundColor: timeIndicator, margin: 'auto', overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block', borderRadius:'10px', marginLeft: '50px'
    }}></span>
    {timer == 0 ? <div style={{
    display:'flex', color:'white', flexDirection:'column', textAlign:'center', marginTop:'90px', transition: '3s ease-in-out'
    }}><h1>Time has run out!</h1>
      <img style={{width:'400px', margin:'20px auto', borderRadius:'15px'}} src="src\images\sad gif.gif" alt="fail picture" />
      <Link onClick={() => setDifficulty('')}
      className="btn bg-light text-dark bold btn-lg" style={{
      display:'inline', fontWeight:'bold'
        }} to='/'>Play again!</Link></div> : win == true ? <div style={{
          marginTop: '90px', textAlign: 'center', transition: '3s ease-in-out'
        }} className="d-flex flex-column
        align-items-center bg-dark text-light text-align-center"><h2>Congratulations! You made it!</h2>
        <h3>You made it with {timer} seconds to spare!</h3>
        <img src="src\images\Office celebtration.gif"/>
      <Link onClick={() => setDifficulty('')}
      className="btn bg-light text-dark bold btn-lg" style={{
      display:'inline', fontWeight:'bold'
        }} to='/'>Play again!</Link></div> : <div style={{
      height: '90vh',
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px',
      placeContent: 'center'
    }}className="mx-3">{boxElem}</div>}
      </div >    
}