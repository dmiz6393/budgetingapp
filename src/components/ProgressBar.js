import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = props => {
  return (
      <>
        <h1 className="icon">Progress to your goal</h1>
    <div>
          
      <Progress 
        progress
        size="large"
        percent={props.percentage.toFixed()}
      >
      </Progress>
    </div>
    </>
  );
};

export default ProgressBar;
