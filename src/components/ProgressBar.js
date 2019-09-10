import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = props => {
  return (
    <div>
    <Progress inverted color='white' size="small" percent={props.percentage} active> 
  Progress to your goal
    </Progress>
    </div>
   
  );
}

export default ProgressBar;
