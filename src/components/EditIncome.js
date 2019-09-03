import React, { Component } from "react";

import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react"; 

class EditIncome extends Component {
//   state = {
//     income: 0
//   };

//   submitButton = event => {
//     event.preventDefault();
//     this.setState({
//       income: event.target.value
//     });
//   };

  render() {
    return (
      <div>
        <form onSubmit={this.props.updateIncome}>
          <input name="income" type="text" />
          <input type="submit" />
        </form>
        <Button onClick={this.props.fetchUserInfo}>
            Done for now 
          </Button>

        <Link to ="/profile">
          <Button>
            Next
          </Button>
          </Link>
      </div>
    );
  }
}

export default EditIncome;
