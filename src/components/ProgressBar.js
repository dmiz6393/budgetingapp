import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = props => {
  return (
    <div>
    <Progress inverted color='white' size="small" percent={props.percentage} active> 
  Progress to your goal
    </Progress>
    <div onClick={() => (window.location = "/insights")} >
        <h5>See more insights here >></h5>
    </div>
    </div>
  );
}

export default ProgressBar;
