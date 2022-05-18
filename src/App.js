import { useState } from "react";
import './App.css';

import GamePage from './pages/GamePage/GamePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';

import { Route, Switch } from 'react-router-dom';

function App (){
    const colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];

    const [selColorIdx, setColorIdx] = useState(0);

    const [gameState, setGameState] = useState(getInitialState());


    /* helper functions */
    function getInitialState() {
      return {
        guesses: [getNewGuess()],
        code: genCode()
      };
    }

    function genCode() {
      return new Array(4).fill().map(() => Math.floor(Math.random() * colors.length));
    }


    function getNewGuess() {
      return {
        code: [null, null, null, null],
        score: {
          perfect: 0,
          almost: 0
        }
      };
    }

    function getWinTries() {
      // if winner, return num guesses, otherwise 0 (no winner)
      let lastGuess = gameState.guesses.length - 1;
      return gameState.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
    }
    
    const winTries = getWinTries();



    function handlePegClick(pegIdx) {
      // make copy of gameState
      const gameStateCopy = {...gameState};

      // get current guess index
      const currentGuessIdx = gameStateCopy.guesses.length - 1;

      // set the current guesses' code to selColIdx
      gameStateCopy.guesses[currentGuessIdx].code[pegIdx] = selColorIdx;

      // set state to new version
      setGameState(gameStateCopy);

    }

    function handleNewGameClick() {
      setGameState(getInitialState());
    }

    function handleScoreClick() {
      // make copy of gameState
      const gameStateCopy = {...gameState};

      // get current guess index - (shortcut variable)
      const currentGuessIdx = gameStateCopy.guesses.length - 1; 

      // make a reference to current guess in the gameState copy - (shortcut variable)
      const currentGuess = gameState.guesses[currentGuessIdx];
  
      /* 
        create "working" copies of the "guessed" code and the secret
        code so that we can modify them as we compute the number of
        perfect and almost without messing up the actual ones in our state copy
      */ 

      const guessCodeCopy = [...currentGuess.code];
      const secretCodeCopy = [...gameStateCopy.code];
  
      let perfect = 0, almost = 0;
  
      // first pass computes number of "perfect"
      guessCodeCopy.forEach((code, idx) => {
        if (secretCodeCopy[idx] === code) {
          perfect++;
          /*
           ensure same choice is not matched again
           by updating both elements in the "working"
           arrays to null
          */ 
          guessCodeCopy[idx] = secretCodeCopy[idx] = null;
        }
      });
  
      // second pass computes number of "almost"
      guessCodeCopy.forEach((code, idx) => {
        if (code === null) return;
        let foundIdx = secretCodeCopy.indexOf(code);
        if (foundIdx > -1) {
          almost++;
          // again, ensure same choice is not matched again
          secretCodeCopy[foundIdx] = null;
        }
      });
  
      // update the current guess score using the reference we created above
      currentGuess.score.perfect = perfect;
      currentGuess.score.almost = almost;
  
  
      // add a new guess if not a winner
      if (perfect !== 4) gameStateCopy.guesses.push(getNewGuess());
  
      // finally, update the state to the updated version
      setGameState(gameStateCopy);
    }

    return (
      <div className="App">
        <header className='App-header-footer'>R E A C T &nbsp;&nbsp;&nbsp;M A S T E R M I N D</header>
        <Switch>
          <Route exact path='/' render={() =>
            <GamePage
              winTries={winTries}
              colors={colors}
              selColorIdx={selColorIdx}
              guesses={gameState.guesses}
              setColorIdx={setColorIdx}
              handleNewGameClick={handleNewGameClick}
              handlePegClick={handlePegClick}
              handleScoreClick={handleScoreClick}
            />
          } />
          <Route exact path="/settings" render={props => 
            <SettingsPage {...props} />
          }/>
        </Switch>
      </div>
    );
}

export default App;