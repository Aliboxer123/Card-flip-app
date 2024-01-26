import { createContext, useState, useEffect } from "react"
export const Cardcontext = createContext()
export default function CardContext({ children }) {
    const [chosenLevel, setChosenLevel] = useState('')
    const [win, setWin] = useState(false)
    const [selected, setSelected] = useState([])
    const [Boxarr, setBoxArr] = useState([{ name: 'Caesar', id: 1, isMatched: false }, { name: 'Caesar', id: 2, isMatched: false },
    { name: 'Pompey', id: 3, isMatched: false }, { name: 'Pompey', id: 4 , isMatched: false},
    { name: 'Crassus', id: 5, isMatched: false }, { name: 'Crassus', id: 6, isMatched: false },
    { name: 'Publius Cornelius Scipio', id: 7, isMatched: false }, { name: 'Publius Cornelius Scipio', id: 8 , isMatched: false},
    { name: 'Hannibal', id: 9, isMatched: false }, { name: 'Hannibal', id: 10, isMatched: false },
    { name: 'Sulla', id: 11 , isMatched: false}, { name: 'Sulla', id: 12 , isMatched: false},
    { name: 'Trebonius', id: 13 , isMatched: false}, { name: 'Trebonius', id: 14 , isMatched: false},
    { name: 'Cicero', id: 15, isMatched: false }, { name: 'Cicero', id: 16, isMatched: false },
    { name: 'Bellisarius', id: 17 , isMatched: false}, { name: 'Bellisarius', id: 18 , isMatched: false},
    { name: 'Justinian', id: 19 , isMatched: false}, { name: 'Justinian', id: 20 , isMatched: false}])
  function shuffle(array){
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; 
    }
    function flip(e, data) {
    const { id } = e.target
    if (selected.length < 2) {
      if (id == data.id) {
        setSelected(oldValue => {
          return [...oldValue, data]
        })
      }
    }
  }
  useEffect(() => {
    shuffle(Boxarr)
  },[])
    function setDifficulty(data) {
        setChosenLevel(data)    
    }
    
    const [isModalOpen, setIsModalOpen] = useState(true)
    return <Cardcontext.Provider value={{
        chosenLevel, setChosenLevel, setDifficulty, Boxarr, setBoxArr,
        isModalOpen, setIsModalOpen,
        selected, setSelected,
        win, setWin, flip
    }}>{children}</Cardcontext.Provider>
}