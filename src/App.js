import React, { Component } from "react";
import API from "./adapters/API";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import { Button } from "semantic-ui-react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import HomePage from "./containers/HomePage";
import WelcomePage from "./components/WelcomePage";
import BudgetCalculator from "./components/BudgetCalculator";
import CreateOwnBudgetForm from "./components/CreateOwnBudgetForm";
import BudgetDropDown from "./components/BudgetDropDown";
import ProfilePage from "./components/ProfilePage";
import EditIncome from "./components/EditIncome";

const usersUrl = "http://localhost:3000/api/v1/users";
const categoriesUrl = "http://localhost:3000/api/v1/categories";
const expensesUrl = "http://localhost:3000/api/v1/expenses";
const now = new Date();
const year = now.getFullYear();

class App extends Component {
  state = {
    user: null,
    showSignIn: false,
    showSignUp: false,
    redirectSignIn: false,
    redirectSignUp: false,
    loggedOut: false,
    categories: [],
    showCostDropDown: false,
    date: null,
    dateNum: null,
    existingUser: false, 
    newUser: false 
  };

  componentDidMount() {
    this.getMonth();
    API.validateUser().then(user => {
      if (user.user) {
        this.setState({
          user: {
            email: user.email,
            user_id: user.id,
            income: user.income,
            first_name: user.first_name
          }
        });
      }
    });
  }

  submitSignUp = user => {
    API.signUpUser(user).then(user => {
      this.setState({
        user: {
          email: user.email,
          user_id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          income: user.income,
        },
        redirectSignUp: true, 
        newUser: true 
      });
    });
  };

  submitSignIn = user => {
    API.signInUser(user).then(user =>
      this.setState({
        user: {
          first_name: user.first_name,
          email: user.email,
          user_id: user.id,
          income: user.income,
          budget: user.budget,
          categories: user.categories
        },
        redirectSignIn: true,
        existingUser: true
      })
    );
  };

  getMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const month = now.getMonth();

    const date = months[month] + " " + year;
    const dateNum = year + "-" + 0 + (month + 1);
    this.setState({
      date: date,
      dateNum: dateNum
    });
  };

  fetchUserInfo = () => {
    fetch(
      usersUrl +
        "/" +
        `${
          this.state.user.user_id !== undefined
            ? this.state.user.user_id
            : this.state.user.id
        }`
    )
      .then(response => response.json())
      .then(res =>
        this.setState({
          user: {
            first_name: res.first_name,
            email: res.email,
            user_id: res.id,
            income: res.income,
            budget: res.budget,
            categories: res.categories
          }
        })
      );
  };

  changeState = () => {
    this.setState({
      showCostDropDown: false
    });
  };
  //when I set the budget again, user.id and userid

  renderRedirectSignIn = () => {
    if (this.state.redirectSignIn) {
      return <Redirect to="/profile" />;
    }
  };

  renderRedirectSignUp = () => {
    if (this.state.redirectSignUp) {
      return <Redirect to="/welcome" />;
    }
  };

  renderLogOut = () => {
    if (this.state.loggedOut) return <Redirect to="/" />;
  };

  logOut = () => {
    API.clearToken();
    this.setState({
      user: null
    });
    this.props.history.push(`/`);
  };

  showSigninClick = () => {
    this.setState({
      showSignIn: !this.state.showSignIn
    });
  };

  showSignUpClick = () => {
    this.setState({
      showSignUp: !this.state.showSignUp
    });
  };

  setBudget = (e, budget) => {
    e.preventDefault();
    fetch(
      usersUrl +
        "/" +
        `${
          this.state.user.user_id !== undefined
            ? this.state.user.user_id
            : this.state.user.id
        }`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          income: this.state.user.income,
          budget: budget
        })
      }
    ).then(response => response.json()).then(()=>this.fetchUserInfo())
  };

  handleSubmitCategory = (event, value) => {
    event.preventDefault();
    fetch(categoriesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: value,
        user_id: this.state.user.user_id
      })
    })
      .then(response => response.json())
      .then(res =>
        this.setState({
          categories: [...this.state.categories, res],
          showCostDropDown: true, 
          existingUser: true 
        })
      );
  };

  handleOwnSubmitCategory = event => {
    event.preventDefault();

    fetch(categoriesUrl, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: event.target.expense.value,
        user_id: this.state.user.user_id
      }) 
    })
      .then(response => response.json())
      .then(res =>
        this.setState({
          categories: [...this.state.categories, res],
          showCostDropDown: true
        })
      ); // parses JSON response into native JavaScript objects
  };

  setCategoryCost = (e, category) => {
    e.preventDefault();
    fetch(expensesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: e.target.cost.value,
        category_id: category.id
      })
    }).then(response => response.json());
  };

  deleteAccount = () => {
    fetch(usersUrl + "/" + `${this.state.user.user_id}`, {
      method: "DELETE"
    }).then(this.props.history.push(`/`));
  };

  changeDate = event => {
    const selectedMonth =
      event.target.children[event.target.value].innerText + " " + year;
    const numberDate = year + "-" + 0 + event.target.value;
    this.setState({
      date: selectedMonth,
      dateNum: numberDate
    });
  };

  updateIncome = e => {
    e.preventDefault();
    return fetch(
      usersUrl +
        "/" +
        `${
          this.state.user.user_id !== undefined
            ? this.state.user.user_id
            : this.state.user.id
        }`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          income: Number(e.target.income.value),
          budget: this.state.user.budget
        })
      }
    ).then(response => response.json())
    .then(()=>this.fetchUserInfo())
  };

  //updating income changes my budget

  addExpenses = (e, category) => {
    e.preventDefault();
    fetch(expensesUrl + "/" + `${category.expenses[0].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category_id: category.id,
        amount: Number(category.expenses[0].amount) + Number(e.target.exp.value)
      })
    }).then(response => response.json()).then(()=>this.fetchUserInfo())
  };

  render() {
    return (
      <div className="App">
        {this.renderRedirectSignIn()}
        {this.renderRedirectSignUp()}
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              submitSignIn={this.submitSignIn}
              submitSignUp={this.submitSignUp}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => (
            <SignUpForm
              submitSignUp={this.submitSignUp}
              goBackHandler={this.goBackHandler}
            />
          )}
        />
        <Route
          exact
          path="/signin"
          render={() => <SignInForm submitSignIn={this.submitSignIn} />}
        />
        <Route
          exact
          path="/welcome"
          render={() => (
            <WelcomePage logOut={this.logOut} user={this.state.user} />
          )}
        />
        <Route
          exact
          path="/budget"
          render={() => (
            <BudgetCalculator
              setBudget={this.setBudget}
              logOut={this.logOut}
              user={this.state.user}
              existingUser={this.state.existingUser}
              newUser={this.state.newUser}
            />
          )}
        />

        <Route
          exact
          path="/budgetform"
          render={() => (
            <CreateOwnBudgetForm
              setBudget={this.setBudget}
              logOut={this.logOut}
              user={this.state.user}
              fetchUserInfo={this.state.fetchUserInfo}
              existingUser={this.state.existingUser}
              newUser={this.state.newUser}
            />
          )}
        />

        <Route
          exact
          path="/expenses"
          render={() => (
            <BudgetDropDown
              handleOwnSubmitCategory={this.handleOwnSubmitCategory}
              handleSubmitCategory={this.handleSubmitCategory}
              categories={this.state.categories}
              showCostDropDown={this.state.showCostDropDown}
              setCategoryCost={this.setCategoryCost}
              fetchUserInfo={this.fetchUserInfo}
            />
          )}
        />

        <Route
          exact
          path="/profile"
          render={() => (
            <ProfilePage
              logOut={this.logOut}
              dateNum={this.state.dateNum}
              date={this.state.date}
              user={this.state.user}
              changeDate={this.changeDate}
              deleteAccount={this.deleteAccount}
              changeState={this.changeState}
              addExpenses={this.addExpenses}
            />
          )}
        />

        <Route
          exact
          path="/income"
          render={() => (
            <EditIncome
              updateIncome={this.updateIncome}
              user={this.state.user}
              fetchUserInfo={this.fetchUserInfo}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
