import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cards, setCards] = useState([])
  const [mapVisibility, setMapVisibility] = useState("hidden")

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!');
      handleResumeGame();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNewGame = () => {
    const url = 'http://3.142.48.123:5000/newgame'
    const options = {
      method: 'GET'
    }

    fetch(url, options)
      .then((rsp) => {
          return rsp.json()
        })
      .then((data) => {
          console.log(data)
          setCards(data)
        })
  }

  const handleResumeGame = () => {
    const url = 'http://3.142.48.123:5000/resumegame'
    const options = {
      method: 'GET'
    }

    fetch(url, options)
      .then((rsp) => {
          return rsp.json()
        })
      .then((data) => {
          setCards(data)
        })
  }

  const handleShowMap = () => {
    setMapVisibility(mapVisibility=="hidden" ? "visible" : "hidden")
  }

  const handleClickCard = (cardIndex) => {
    // update server gamedata
    const url = 'http://3.142.48.123:5000/clickcard'
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 'cardIndex': cardIndex })
    }

    fetch(url, options)

    // update client
    let newCards = [...cards]
    newCards[cardIndex]["isClicked"] = true
    setCards(newCards)

  }

  return (
    <div className="App">
      <h1>Codenames</h1>
      <div>
        <Button class="btn btn-outline-primary" onClick={handleNewGame}>New Game</Button>
        <Button class="btn btn-outline-danger" onClick={handleShowMap}>Show/Hide Map</Button>
      </div>
      <div className='grid'>
        {
         cards.map((cardInfo, cardIndex) => (
            <SingleCard 
              key={cardInfo["word"]} 
              cardInfo={cardInfo} 
              cardIndex={cardIndex} 
              showColor={cardInfo["isClicked"]}
              handleClickCard={handleClickCard}
            />
          ))
        }
      </div>

      <div style={{"visibility": mapVisibility}}>
        <h1>Map</h1>
        <div className='grid'>
          {
          cards.map((cardInfo, cardIndex) => (
              <SingleCard 
                key={cardInfo["word"]} 
                cardInfo={cardInfo} 
                cardIndex={cardIndex} 
                showColor={true}
                handleClickCard={handleClickCard}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
