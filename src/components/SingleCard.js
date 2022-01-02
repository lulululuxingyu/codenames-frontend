import { Button } from 'react-bootstrap'

export default function SingleCard ({cardInfo, cardIndex, showColor, handleClickCard}) {
    return(
        <div>
            <button
                className='card' 
                style={{backgroundColor: showColor? cardInfo["color"] : "white"}}
                onClick={() => {handleClickCard(cardIndex)}}>
                {cardInfo["word"]}
            </button>
        </div>
    )
}