import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import ExpenseCardNew from "./ExpenseCardNew";
import {
  Menu,
  Container,
  Divider,
  Grid,
  Segment,
  List,
  Button, Icon
} from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Redirect,
  withRouter
} from "react-router-dom";

const COLORS = ["#FFDAB9", "#FFA07A", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class ProfilePageNew extends React.Component {
  redirectToBudgetOptions = () => {
    return <Redirect to="/budgetoptions" />;
  };

  totalAmount = () => {
    if (this.props.expensesFilled == true) {
      const amountArray = this.props.user.categories.map(
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

  render() {
    const data = [
      {
        name: "left",
        value: this.props.expensesFilled
          ? this.props.user.budget - this.totalAmount()
          : 100
      },
      {
        name: "spent",
        value: this.props.expensesFilled ? this.totalAmount() : 0
      }
    ];

    const expenseCard =
      this.props.user.categories === undefined
        ? null
        : this.props.user.categories
            .filter(category => {
              return category.expenses[0].created_at.includes(
                this.props.dateNum
              );
            })
            .map(category => {
              return (
                <ExpenseCardNew
                  addExpenses={this.props.addExpenses}
                  category={category}
                  editCategory={this.props.editCategory}
                  deleteExpense={this.props.deleteExpense}
                />
              );
            });

    return (
      <>
 
      <Menu icon="labeled" vertical compact size="mini" className="account">
      <Menu.Item onClick={() => (window.location = "/newprofile")}
            active="user"
          name="user"
          > <Icon align= "right" color="black" name="user"/> Profile
          </Menu.Item>
          <Menu.Item onClick={() => (window.location = "/settings")}
            active="user"
          name="user"
          > <Icon align= "right" color="black" name="setting"/> Settings
          </Menu.Item>
          <Menu.Item  onClick={this.props.logOut}
            active="user"
          name="settings"
          > <Icon onClick={this.props.logOut}align= "right" color="black" name="log out"/> Log out
          </Menu.Item>
      </Menu>
 
        <Container>
          <PieChart class="left recharts-wrapper" width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Container>
<div className="profile">
        <h1 class="thick icon">{this.props.date}</h1>
        <div class="month">
          <Menu compact>
            <select onChange={this.props.changeDate} id="gMonth1">
              <option value=""> --Select Month--</option>
              <option name="January" value="1">
                January
              </option>
              <option name="February" value="2">
                February
              </option>
              <option name="March" value="3">
                March
              </option>
              <option name="April" value="4">
                April
              </option>
              <option name="May" value="5">
                May
              </option>
              <option name="June" value="6">
                June
              </option>
              <option name="July" value="7">
                July
              </option>
              <option name="August" value="8">
                August
              </option>
              <option name="September" value="9">
                September
              </option>
              <option name="October" value="10">
                October
              </option>
              <option name="November" value="11">
                November
              </option>
              <option name="December" value="12">
                December
              </option>
            </select>
          </Menu>
        </div>
        <h3></h3>
        <div onClick={() => (window.location = "/budgetoptions")}>
          <Segment>
            <Grid columns={2} relaxed="very">
              <Grid.Column>
                <p>Monthly Budget</p>
                <p>
                  {" "}
                  {this.props.budgetFilled ? (
                    <>
                      <p>{this.props.user.budget}</p> <p>Tap to edit</p>
                    </>
                  ) : (
                    <p>Tap to set</p>
                  )}
                </p>
              </Grid.Column>
              <Grid.Column>
                <p>Remaining Budget</p>
                <p>
                  {" "}
                  {this.props.budgetFilled ? (
                    <>
                      {" "}
                      <p>
                        {this.props.user.budget - Number(this.totalAmount())}
                      </p>{" "}
                      <p>Tap to edit</p>{" "}
                    </>
                  ) : (
                    <p>Tap to set</p>
                  )}
                </p>
              </Grid.Column>
            </Grid>
            <Divider vertical>And</Divider>
          </Segment>
          <h3></h3>
        </div>
        {this.props.expensesFilled ? (
          <>
            {" "}
            {expenseCard}{" "}
            <List>
              {" "}
              <List.Item>
                <List.Content floated="right">
                  <Button onClick={() => (window.location = "/newexpense")}>
                    Add
                  </Button>
                </List.Content>
                <List.Content className="icon left">
                  Add Another Transaction
                </List.Content>
              </List.Item>{" "}
            </List>{" "}
          </>
        ) : (
          <Button onClick={() => (window.location = "/newexpense")}>
            ADD YOUR FIRST TRANSACTION
          </Button>
        )}
        </div>
      </>
    );
  }
}
export default withRouter(ProfilePageNew);
