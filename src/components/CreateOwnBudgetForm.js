import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

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
      <div className="form-container">
        <Form inverted onSubmit={e => this.props.setBudget(e, this.state.budget)}>
          <label><h1 className="icon">How much would you like to save each month?</h1></label>
          <h5> </h5>
          <input onChange={this.submitButton} name="budget" type="number" />
          <h5> </h5>
          <Button onClick={this.showNxt}  inverted color="grey" type="submit" >
            Submit
          </Button>
        </Form>
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
