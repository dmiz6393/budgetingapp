import React, { Component } from "react";
import { Dropdown, Form, Menu, Icon } from 'semantic-ui-react'
import {Link} from "react-router-dom"
import bus from "../Icons/bus.jpg"
import bills from "../Icons/bills.jpg"
import education from "../Icons/education.jpg"
import entertainment from "../Icons/Entertainment.jpg"
import fitness from "../Icons/fitness.jpg"
import food from "../Icons/Food.jpg"
import home from "../Icons/home.jpg"
import loans from "../Icons/Loans.jpg"
import travel from "../Icons/travel.jpg"
import gifts from '../Icons/gifts.jpg'

const expenseOptions= [
    {
        key: "Transport",
        text: "Transport", 
        value: "Transport",
        name: "Transport",
        image: {avatar: true, src: bus}
    },
    {
        key: "Bills & Utilities",
        text: "Bills & Utilities",
        value:"Bills & Utilities",
        name: "Bills & Utilities",
        image: {avatar: true, src: bills}
    }, 
    {
        key: "Home",
        text: "Home",
        value:"Home",
        image: {avatar: true, src: home}
    }, 
    {
        key: "Education",
        text:"Education",
        value:"Education",
        image: {avatar: true, src: education}
    }, 
    {
        key: "Entertainment",
        text: "Entertainment",
        value:"Entertainment",
        image: {avatar: true, src: entertainment}
    }, 
    {
        key: "Insurance",
        text: "Insurance",
        value:"Insurance",
        image: {avatar: true, src: bills}
    }, 
    {
        key: "Food",
        text: "Food",
        value:"Food",
        image: {avatar: true, src: food}
    }, 
    {
        key: "Gifts",
        text: "Gifts",
        value:"Gifts",
        image: {avatar: true, src: gifts}
    }, 
    {
        key: "Fitness",
        text: "Fitness",
        value: "Fitness",
        image: {avatar: true, src: fitness}
    }, 
    {
        key: "Loans",
        text: "Loans",
        value:"Loans",
        image: {avatar: true, src: loans}
    }, 
    {
        key: "Travel",
        text: "Travel",
        value:"Travel",
        image: {avatar: true, src: travel}
    }, 
]


class NewExpense extends Component {
    
    state={
        category: null,
        expense: null 
    }

    handleChangeDropDown=(event)=>{
        this.setState({
            category: event.target.innerText 
        })
        
    }


    formFieldChange=(event)=>{
        this.setState({
            expense: event.target.expense.value
        })
  
}
    
    
    render() {  
      return (
          <>
          <Menu icon="labeled" vertical compact size="mini" className="account">
          
          <Menu.Item 
              onClick={() => (window.location = "/profile")}
              active="user"
              name="user"
            >
              {" "}
              <Icon align="right" color="black" name="user" /> My profile
            </Menu.Item>
            </Menu>  
            <h1> </h1>
        <div className= "form-container">
            <Form onSubmit={(e)=>this.props.handleSubmitCategory(e, this.state.category, this.state.expense)} size="large">
                <div className="width">
                <Form.Group>
                <Form.Field onChange={this.formFieldChange}
                    control="input"
                    type="number"
                    placeholder="$0.0"
                    name="expense"
                />
                  </Form.Group>
                  </div>
       <Dropdown onChange={(e)=>this.handleChangeDropDown(e,expenseOptions)} placeholder= "Select Expense" 
       fluid selection options={expenseOptions} /> 
     <h1 className="icon"> Don't see what you're looking for? Add your own category <Link to= "/mycategory" > here </Link> </h1>
        <Form.Button inverted> Submit </Form.Button>
       </Form>
        </div>
      </> 
      )
    }
  }
  
  export default NewExpense;
  