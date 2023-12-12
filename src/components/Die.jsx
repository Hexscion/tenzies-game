import dice1 from "../assets/dice1.svg"
import dice2 from "../assets/dice2.svg"
import dice3 from "../assets/dice3.svg"
import dice4 from "../assets/dice4.svg"
import dice5 from "../assets/dice5.svg"
import dice6 from "../assets/dice6.svg"

export default function Die( {value, isHeld, holdDice} ) {

    const styles = {
        filter: isHeld && "invert(100%) sepia(18%) saturate(7482%) hue-rotate(65deg) brightness(104%) contrast(76%)"
    }

    return (
        <div className={`die-face`} onClick={holdDice}>
            <img src={`/src/assets/dice${value}`} style={styles} alt={`dice${value}`} />
        </div>
    )
}