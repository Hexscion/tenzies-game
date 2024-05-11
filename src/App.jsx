import { useState, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Modal from 'react-modal'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');
function App() {

    const [startGame, setStartGame] = useState(false)
    const [diceArray, setDiceArray] = useState([])
    const [tenzies, setTenzies] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [time, setTime] = useState(0)
    const [roll, setRoll] = useState(0)
    const [bestTime, setBestTime] = useState(0)
    const [bestRoll, setBestRoll] = useState(0)
    let interval

    useEffect(() => {
        setTenzies(diceArray.length!=0 && diceArray.every((die) => die.value === diceArray[0].value))
    }, [diceArray])

    useEffect(() => {
        if (tenzies) {
            setIsOpen(tenzies)
            if(bestTime >= time){
                setBestTime(time)
                localStorage.setItem('time', time)
            }
            if(bestRoll >= roll){
                setBestRoll(roll)
                localStorage.setItem('roll', roll)
            }
        }
    }, [tenzies])

    useEffect(() => {
        if (!tenzies && startGame) {
            interval = setInterval(() => {
                setTime((time) => time + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [tenzies, startGame])

    useEffect(() => {
        if (startGame) {
            setDiceArray(generateNewDie())
        }
        setBestTime(localStorage.getItem('time') || 999)
        setBestRoll(localStorage.getItem('roll') || 999)
    }, [startGame])

    const diceElements = diceArray.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    function generateNewDie() {
        let array = []
        for (let i = 0; i < 10; i++) {
            array.push({
                id: nanoid(),
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false
            })
        }
        return array
    }

    function rollDice() {
        setDiceArray((oldArray) => {
            return oldArray.map((die) => {
                return die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
            })
        })
        setRoll((roll) => roll + 1)
    }

    function holdDice(id) {
        setDiceArray((oldArray) => {
            return oldArray.map((die) => {
                return die.id===id ? {...die, isHeld: !die.isHeld} : die
            })
        })
    }

    function restart() {
        setDiceArray(generateNewDie())
        setStartGame(false)
        setTenzies(false)
        setDiceArray([])
        setTime(0)
        setRoll(0)
    }

    return (
        <main>
            <div className='head-container'>
                <div className='timer-container'>
                    <div><h1>Time</h1><h1>{time} sec</h1></div>
                    <div><p>Best Time</p><p>{bestTime} sec</p></div>
                </div>

                <div className='title-container'>
                    <h1 className="title">Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                </div>

                <div className='rolls-container'>
                    <div><h1>Roll</h1><h1>{roll}</h1></div>
                    <div><p>Best Roll</p><p>{bestRoll}</p></div>
                </div>
            </div>
            <div className="dice-container">
                {diceElements}
            </div>
            {  
                <Modal
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                    style={customStyles}
                >
                    <h1>You won!</h1>
                </Modal>
            }
            { tenzies && <Confetti /> }
            { !startGame && <button className="roll-dice" onClick={() => setStartGame(true)}>Start</button> }
            { startGame && !tenzies && <button className="roll-dice" onClick={rollDice}>Roll</button> }
            { tenzies && <button className="roll-dice" onClick={restart}>Restart</button> }
        </main>
    )
}

export default App
