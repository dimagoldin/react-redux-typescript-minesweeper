import React from "react";
import { useNumOfFlagsLeft } from "../../store/hooks";
import NumberDisplay from "../NumberDisplay";

const FlagsLeftDisplay: React.FC = () => {
  const numOfFlagsLeft: number = useNumOfFlagsLeft();

  return <NumberDisplay value={numOfFlagsLeft} />;
};

export default FlagsLeftDisplay;