import React, { useCallback, useEffect } from "react";
import { useGameDispatch, useGameOver, useGameSize, usePlayerWon } from "../../store/hooks";
import { GameSize, NEW_GAME } from "../../types";

const GameStatus: React.FC = () => {
  const gameOver: boolean = useGameOver();
  const gameSize: GameSize = useGameSize();
  const playerWon: boolean = usePlayerWon();
  const dispatch = useGameDispatch();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      dispatch({ type: NEW_GAME, size: gameSize });
    },
    [dispatch, gameSize],
    );
    
    useEffect(() => {
        if (playerWon) {
            setTimeout(() => alert('Winner winner chicken dinner!'), 100);
        }
        if (!playerWon && gameOver) {
            setTimeout(() => alert('Better luck next time!'), 100);
            
        }
    })

  const getFace = () => {
    return gameOver ? (playerWon ? "😊" : "😭") : "😐";
  };

  return (
    <div className="Face">
      <span role="img" aria-label="face" onClick={onClick}>
        {getFace()}
      </span>
    </div>
  );
};

export default GameStatus;
