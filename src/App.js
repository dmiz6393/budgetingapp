import React, { Component } from "react";
import API from "./adapters/API";
import "./App.css";

import { Route, Redirect, withRouter } from "react-router-dom";
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
import ExpenseInput from "./components/ExpenseInput";
import NewIns from "./components/NewIns";
import ProgressBar from "./components/ProgressBar";
const usersUrl = "https://budgey-app.herokuapp.com/api/v1/users";
const profileUrl = "https://budgey-app.herokuapp.com/api/v1/profile";
const categoriesUrl = "https://budgey-app.herokuapp.com/api/v1/categories";
const expensesUrl = "https://budgey-app.herokuapp.com/api/v1/expenses";
const now = new Date();
const year = now.getFullYear();

class App extends Component {
  state = {
    user: null,
    redirectSignIn: false,
    redirectSignUp: false,
    categories: [],
    date: null,
    dateNum: null,
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
            budget: user.user.budget,
            goals: user.user.goals
          },
          budgetFilled: user.user.budget !== null ? true : false,
          expensesFilled: user.user.categories.length !== 0 ? true : false
        });
      }
    });
  }

  submitSignUp = user => {
    API.signUpUser(user).then(data => {
      if (data.user) {
        const user = data.user;
        this.setState({
          user: {
            email: user.email,
            user_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            income: user.income,
            goals: null
          },
          redirectSignUp: true,
          budgetFilled: user.budget !== null ? true : false,
          expensesFilled: user.categories.length !== 0 ? true : false
        });
      } else {
        window.alert(data.messages);
      }
    });
  };

  submitSignIn = user => {
    API.signInUser(user).then(data => {
      const user = data.user;
      this.setState({
        user: {
          first_name: user.first_name,
          email: user.email,
          user_id: user.id,
          income: user.income,
          budget: user.budget,
          categories: user.categories,
          goals: user.goals
        },
        budgetFilled: user.budget !== null ? true : false,
        expensesFilled: user.categories.length !== 0 ? true : false,
        redirectSignIn: true
      });
    });
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

  fetchUserInfo = (callback = () => {}) => {
    fetch(profileUrl, {
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(response => response.json())
      .then(res => {
        this.setState(
          {
            user: {
              first_name: res.first_name,
              email: res.email,
              user_id: res.id,
              income: res.income,
              budget: res.budget,
              categories: res.categories,
              goals: res.goals
            },
            budgetFilled: res.budget !== 0 ? true : false,
            expensesFilled: res.categories.length !== 0 ? true : false
          },
          callback()
        );
      });
  };

  renderRedirectSignIn = () => {
    if (this.state.redirectSignIn) {
      return <Redirect to="/profile" />;
    }
  };

  renderRedirectSignUp = () => {
    if (this.state.redirectSignUp) {
      return <Redirect to="/profile" />;
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
    fetch(profileUrl, {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        income: this.state.user.income,
        budget: budget,
        goals: this.state.user.goals
      })
    })
      .then(response => response.json())
      .then(() => this.fetchUserInfo())
      .then(
        this.setState({
          budgetFilled: this.state.user.budget !== null ? true : false,
          expensesFilled: this.state.user.categories.length !== 0 ? true : false
        })
      )
      .then(() => this.props.history.push(`/profile`));
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
      .then(() => this.fetchUserInfo(this.renderProfile));
  };

  renderProfile = () => {
    this.setState(
      {
        expensesFilled: true
      },
      () => this.props.history.push("/profile")
    );
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
    return fetch(profileUrl, {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        income: Number(e.target.income.value),
        budget: this.state.user.budget,
        goals: this.state.user.goals,
        budgetFilled: this.state.user.budget !== null ? true : false,
        expensesFilled: this.state.user.categories.length !== 0 ? true : false
      })
    })
      .then(response => response.json())
      .then(() => this.fetchUserInfo())
      .then(() => this.props.history.push(`/profile`));
  };

  editCategory = (event, category) => {
    event.preventDefault();
    const expense = event.target.amount.value;
    fetch(categoriesUrl + "/" + `${category.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: event.target.category.value })
    })
      .then(response => response.json())
      .then(res => this.editExpenseAmount(res, expense));
  };

  editExpenseAmount = (res, expense) => {
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
      .then(() => this.fetchUserInfo());
  };

  deleteExpense = (e, category) => {
    fetch(categoriesUrl + "/" + `${category.id}`, {
      method: "DELETE"
    }).then(() => this.fetchUserInfo(this.renderProfile));
  };

  saveGoal = event => {
    return fetch(
      profileUrl, {
        method: "PATCH",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          income: this.state.user.income,
          budget: this.state.user.budget,
          goals: Number(event.target.goal.value)
        })
      }
    )
      .then(response => response.json())
      .then(() => this.fetchUserInfo());
  };

  totalAmount = () => {
    if (this.state.expensesFilled === true) {
      const amountArray = this.state.user.categories.map(
        category => category.expenses
      );
      const newAmount = amountArray.filter(expense => expense.length !== 0);
      const finalAmount = newAmount.filter(expense => {
        return expense[0].amount !== null;
      });

      const dates = finalAmount.filter(expense => {
        return expense[0].created_at.includes(this.props.dateNum);
      });

      const newNew = dates.map(expense => {
        return expense[0].amount;
      });
      const sum = newNew.reduce((a, b) => a + b, 0);
      return sum;
    } else {
      return 0;
    }
  };

  amountSaved = () => {
    const monthlyIncome = this.state.user.income / 12;
    const saved = monthlyIncome - this.totalAmount();
    const savedPercent = (saved / this.state.user.goals) * 100;
    return <ProgressBar percentage={savedPercent} />;
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
              saveGoal={this.saveGoal}
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
            />
          )}
        />

        <Route
          exact
          path="/profile"
          render={() => (
            <ProfilePageNew
              logOut={this.logOut}
              dateNum={this.state.dateNum}
              date={this.state.date}
              user={this.state.user}
              changeDate={this.changeDate}
              budgetFilled={this.state.budgetFilled}
              expensesFilled={this.state.expensesFilled}
              editCategory={this.editCategory}
              deleteExpense={this.deleteExpense}
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

        <Route
          exact
          path="/mycategory"
          render={() => (
            <ExpenseInput handleSubmitCategory={this.handleSubmitCategory} />
          )}
        />

        <Route
          exact
          path="/insights"
          render={() => (
            <NewIns
              amountSaved={this.amountSaved}
              date={this.state.date}
              dateNum={this.state.dateNum}
              user={this.state.user}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
