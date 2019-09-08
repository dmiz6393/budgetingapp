import React, { Component } from "react";
import API from "./adapters/API";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import HomePage from "./containers/HomePage";
import BudgetCalculator from "./components/BudgetCalculator";
import CreateOwnBudgetForm from "./components/CreateOwnBudgetForm";
import EditIncome from "./components/EditIncome";
import ProfilePageNew from "./components/ProfilePageNew";
import BudgetOptionsPage from "./components/BudgetOptionsPage";
import NewExpense from "./components/NewExpense";
import SettingPage from "./components/SettingPage";

const usersUrl = "http://localhost:3000/api/v1/users";
const categoriesUrl = "http://localhost:3000/api/v1/categories";
const expensesUrl = "http://localhost:3000/api/v1/expenses";
const now = new Date();
const year = now.getFullYear();

class App extends Component {
  state = {
    user: null,
    redirectSignIn: false,
    redirectSignUp: false,
    loggedOut: false,
    categories: [],
    date: null,
    dateNum: null,
    existingUser: false,
    newUser: false,
    budgetFilled: false,
    expensesFilled: false
  };

  componentDidMount() {
    this.getMonth();
    API.validateUser().then(user => {
      console.log(user);
      if (user.user) {
        this.setState({
          user: {
            email: user.user.email,
            user_id: user.user.id,
            income: user.user.income,
            first_name: user.user.first_name,
            categories: user.user.categories,
            budget: user.user.budget
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
          income: user.income
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
        existingUser: true,
        budgetFilled: user.budget !== 0 ? true : false,
        expensesFilled: user.categories.length !== 0 ? true : false
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

  renderRedirectSignIn = () => {
    if (this.state.redirectSignIn) {
      return <Redirect to="/newprofile" />;
    }
  };

  renderRedirectSignUp = () => {
    if (this.state.redirectSignUp) {
      return <Redirect to="/newprofile" />;
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
    )
      .then(response => response.json())
      .then(() => this.fetchUserInfo())
      .then(
        this.setState({
          budgetFilled: true,
          expensesFilled: this.state.user.categories.length !==0 ? true : false
        })
      )
      .then(this.props.history.push(`/newprofile`));
  };

  handleSubmitCategory = (event, category, expense) => {
    event.preventDefault();
    fetch(categoriesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: category,
        user_id: this.state.user.user_id
      })
    })
      .then(response => response.json())
      .then(res => this.setCategoryCost(res, expense));
  };

  setCategoryCost = (res, expense) => {
    fetch(expensesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: expense,
        category_id: res.id
      })
    })
      .then(response => response.json())
      .then(this.fetchUserInfo())
      .then(() => {
        this.renderProfile();
      });
  };

  renderProfile = () => {
    this.setState({
      expensesFilled: true
    });
    this.props.history.push("/newprofile");
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
    )
      .then(response => response.json())
      .then(() => this.fetchUserInfo());
  };

  editCategory = (event, category) => {
    event.preventDefault();
    const expense= event.target.amount.value 
    fetch(categoriesUrl + "/" + `${category.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: event.target.category.value }) 
    })
      .then(response => response.json())
      .then(res => this.editExpenseAmount(res,expense)); 
  };

  editExpenseAmount = (res,expense) => {
    fetch(expensesUrl + "/" + `${res.expenses[0].id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: Number(expense),
        category_id: res.id
      }) 
    })
      .then(response => response.json())
      .then(this.fetchUserInfo()); // parses JSON response into native JavaScript objects
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
          path="/budget"
          render={() => (
            <BudgetCalculator
              setBudget={this.setBudget}
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
              user={this.state.user}
              fetchUserInfo={this.state.fetchUserInfo}
              existingUser={this.state.existingUser}
              newUser={this.state.newUser}
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

        <Route
          exact
          path="/newprofile"
          render={() => (
            <ProfilePageNew
              logOut={this.logOut}
              dateNum={this.state.dateNum}
              date={this.state.date}
              user={this.state.user}
              changeDate={this.changeDate}
              changeState={this.changeState}
              addExpenses={this.addExpenses}
              existingUser={this.state.existingUser}
              budgetFilled={this.state.budgetFilled}
              expensesFilled={this.state.expensesFilled}
              editCategory={this.editCategory}
            />
          )}
        />

        <Route
          exact
          path="/budgetoptions"
          render={() => <BudgetOptionsPage />}
        />

        <Route
          exact
          path="/settings"
          render={() => <SettingPage deleteAccount={this.deleteAccount} />}
        />

        <Route
          exact
          path="/newexpense"
          render={() => (
            <NewExpense handleSubmitCategory={this.handleSubmitCategory} />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
