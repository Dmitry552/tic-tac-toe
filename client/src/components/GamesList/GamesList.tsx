import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Http from '../modulHttp';
import {Card} from '../Card/Card';
import './GamesList.scss';
import {Game} from '../../types/games';
import {Props} from './Props.type';

 
export const GamesList = (props: Props): JSX.Element => {
  const [games, setGames] = useState<Game[]>([]);
  const {heandlerNewGame, heandlerEnterTheGame} = props
  
  useEffect(() => {
    Http<Array<Game>>('http://localhost:8000/games').then(resolve => setGames(resolve));
  }, [])
  console.log('games', games)
  
  return (
    <div className="game_list">
      <div className="button_block">
        <Link to='/game/play'>
          <button type='button' onClick={()=>heandlerNewGame()}>Создать новую игру</button>
        </Link>
      </div>
      <div className="game-list">
        {games ? games.map(e => {
          console.log('e', e)
          return (
            <Card 
              heandlerEnterTheGame = {heandlerEnterTheGame}
              game = {e}
              key = {e.uuid}
          />
          )
        }) : <h1>Извените доступных игр нет</h1>}
      </div>
    </div>
  )
}