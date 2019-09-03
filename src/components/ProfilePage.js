import React from "react";
import CategoryCard from "./CategoryCard";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class ProfilePage extends React.Component {
  calculateAmountToGoal = () => {};
  totalAmount = () => {
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
  };

//   filteredCategories = () => {
//     const filteredCategory = this.props.user.categories.filter(category => {
//       return category.expenses[0].created_at.includes(this.props.dateNum);
//     });
//   };

  render() {
    const data = [
      { name: "left", value: this.props.user.budget - this.totalAmount() },
      { name: "spent", value: this.totalAmount() }
    ];

    const category =
      this.props.user.categories === undefined ? null : 
        this.props.user.categories.filter(category => {
            return category.expenses[0].created_at.includes(this.props.dateNum);
          }).map(category => {
        return <CategoryCard addExpenses={this.props.addExpenses} category={category} />;
      }) ;

    return (
      <>
        <div>
          <h1>{this.props.date}</h1>
          <PieChart width={400} height={400}>
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

          <div>
            <select onChange={this.props.changeDate} id="gMonth1">
              <option value="">--Select Month--</option>
              <option name="Janaury" value="1">
                Janaury
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
          </div>
          <h2>Budget: {this.props.user.budget}</h2>
          <h3>How much I've spent this month:{this.totalAmount()}</h3>
          <h3>
            Amount left to spend: {this.props.user.budget - this.totalAmount()}
          </h3>
          <h3>Amount to my goal:</h3>
          <h3>{category}</h3>
          <Link to="/budget">
            <Button>Recalculate my budget</Button>{" "}
          </Link>
          <Link to="/budgetform">
            <Button>Edit my budget</Button>{" "}
          </Link>
          <Link to="/income">
            <Button>Edit my income</Button>{" "}
          </Link>
          <Button onClick={this.props.deleteAccount}>Delete My Account</Button>
          <Link to="/expenses">
            <Button onClick={this.props.changeState}>Add an Expense </Button>{" "}
          </Link>
        </div>
        <Button onClick={this.props.logOut}>Log out</Button>
      </>
    );
  }
}
export default ProfilePage;
