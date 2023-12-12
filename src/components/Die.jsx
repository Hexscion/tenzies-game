export default function Die( {value, isHeld, holdDice} ) {

    const styles = {
        filter: isHeld && "invert(100%) sepia(18%) saturate(7482%) hue-rotate(65deg) brightness(104%) contrast(76%)"
    }

    return (
        <div className={`die-face`} onClick={holdDice}>
            <img src={`/dice${value}.svg`} style={styles} alt={`dice${value}`} />
        </div>
    )
}