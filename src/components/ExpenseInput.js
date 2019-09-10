import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

class ExpenseInput extends Component {
  state = {
    category: null,
    expense: null
  };

  formFieldChangeExpense = event => {
    event.preventDefault();

    this.setState({
      expense: event.target.value
    });
  };

  formFieldChangeCategory = event => {
    event.preventDefault();

    this.setState({
      category: event.target.value
    });
  };

  render() {
    return (
      <div className="form-container">
        <Form
          onSubmit={event =>
            this.props.handleSubmitCategory(
              event,
              this.state.category,
              this.state.expense
            )
          }
        >
          <Form.Field
            className="width"
            onChange={this.formFieldChangeExpense}
            control="input"
            type="number"
            placeholder="$0.0"
            name="expense"
          />
          <Form.Field
            onChange={this.formFieldChangeCategory}
            name="category"
            type="text"
            control="input"
            placeholder="Category name"
          />
          <Button> Submit </Button>
        </Form>
      </div>
    );
  }
}

export default ExpenseInput;

//event,category,expense
