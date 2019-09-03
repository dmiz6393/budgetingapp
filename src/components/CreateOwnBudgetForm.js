import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class CreateOwnBudgetForm extends Component {
  state = {
    budget: 0,
    showNext: false
  };

  submitButton = event => {
    event.preventDefault();
    this.setState({
      budget: event.target.value
    });
  };

  showNxt=()=>{
    this.setState({
      showNext: true
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.props.setBudget(e, this.state.budget)}>
          <input onChange={this.submitButton} name="budget" type="number" />
          <Button >
            <input onClick={this.showNxt} type="submit" />
          </Button>
        </form>
        <div>
        {this.state.showNext && this.props.existingUser ? (
          <Button>
            <Link to="/profile"> My Profile</Link>
          </Button>
        ) : (
          <div></div>
        )}

        {this.state.showNext && this.props.newUser ? (
          <Button>
            {" "}
            <Link to="/expenses">My Expenses </Link>
          </Button>) 
          :(<div></div>)
        }
        
        </div>
      </div>
    );
  }
}

export default CreateOwnBudgetForm;
