import React, { Component } from "react";

class Transactions extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.category.name}</h2>
        <form
          onSubmit={(e)=>this.props.setCategoryCost(e, this.props.category)}
        >
          <input name="cost" type="number" placeholder="cost"></input>
          <input onClick={this.props.allowDoneHandler} type="submit"/> 
        </form>
      </div>
    );
  }
}

export default Transactions;
