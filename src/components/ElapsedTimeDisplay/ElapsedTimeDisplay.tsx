import React from "react";
import { useGameClock } from "../../store/hooks";
import NumberDisplay from "../NumberDisplay";

const ElapsedTimeDisplay: React.FC = () => {
  const { elapsedTime } = useGameClock();

  return <NumberDisplay value={elapsedTime < 0 ? 0 : elapsedTime} />;
};

export default ElapsedTimeDisplay;
