import GameBoard from '../../components/GameBoard/GameBoard';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import GameTimer from '../../components/GameTimer/GameTimer';
import NewGameButton from '../../components/NewGameButton/NewGameButton';

import { Link } from 'react-router-dom';

const GamePage = (props) => {
    return (
      <div className="App">
        <div className="flex-h align-flex-end">
          <GameBoard 
            colors={props.colors} 
            guesses={props.guesses}
            handleScoreClick={props.handleScoreClick} 
            handlePegClick={props.handlePegClick}
          />
          <div className="App-controls">
            <ColorPicker 
              colors={props.colors} 
              selColorIdx={props.selColorIdx} 
              setColorIdx={props.setColorIdx}
            />
            <GameTimer />
            <Link 
              style={{ "margin-bottom": "10px" }} 
              className="btn btn-default" 
              to="/settings">
                Difficulty
            </Link>
            <NewGameButton handleNewGameClick={props.handleNewGameClick} />
          </div>
        </div>
        <footer className='App-header-footer'>{props.winTries ? `You Won in ${props.winTries} Guesses!` : 'Good Luck!'}</footer>
      </div>
    );
};
  
export default GamePage;