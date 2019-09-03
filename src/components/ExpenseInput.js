import React, { Component } from "react";


class ExpenseInput extends Component {
    render() {
      return (
        <div>
          
       <form>
           <input onChange={this.props.handleChange} type="text" ></input>
       </form>
        </div>
      );
    }
  }
  
  export default ExpenseInput;
  