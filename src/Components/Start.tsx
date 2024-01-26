import { Link } from "react-router-dom"
import '../App.css'
import { useContext, useEffect } from "react"
import { Cardcontext } from "./context"
export default function Start() {    
    const { chosenLevel, setDifficulty, setIsModalOpen } = useContext(Cardcontext)
    useEffect(()=>setIsModalOpen(true),[])
    const difficultyLevel = ['easy', 'medium', 'hard']
    const difficultyMapped = difficultyLevel.map((data, index) => {
        return <li style={{
            transform: data == chosenLevel ? 'scale(1,1.2)' : '',
        }} className={data == chosenLevel ? `bg-secondary`:''}
            key={index} onClick={()=>setDifficulty(data) }><span >{data}</span></li>    
    })
    return <div style={{ backgroundColor: '#453636' }}
        className="vh-100 vw-100 d-flex justify-content-center align-items-center">
        <Link style={{
            pointerEvents: chosenLevel ? 'all' : 'none',
            opacity: chosenLevel ? '1' : '0.1'
        }} to='/start' className="start">Start game</Link>
        {/* <span className="difficulty">Difficulty level</span> */}
        <ul style={{
            display: 'flex', flexDirection: 'column', backgroundColor: 'aliceblue', borderRadius: '15px',
            justifyContent:'space-between', alignItems:'center', padding: '25px', marginLeft:'15px'
        }}>{difficultyMapped}</ul>
</div>    
}