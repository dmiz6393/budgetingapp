import React, { Component } from "react";
import { List, Icon } from "semantic-ui-react";
import {
  Link, 
    withRouter
  } from "react-router-dom"; 

class SettingPage extends Component {
  render() {
    return (
      <div className="settings thick">
        <List divided relaxed>
          <List.Item onClick={() => (window.location = "/income")}>
            <List.Icon
              name="money bill alternate"
              size="large"
              verticalAlign="middle"
            />
            <List.Content>Edit Income</List.Content>
          </List.Item>
          <List.Item onClick={() => (window.location = "/budgetoptions")}>
          <List.Icon
              name="plus"
              size="large"
              verticalAlign="middle"
            />
            <List.Content>Edit Budget</List.Content>
          </List.Item>
          <List.Item onClick={this.props.deleteAccount}>
            <List.Icon
              name="frown outline"
              size="large"
              verticalAlign="middle"
            />
            <List.Content>Delete Profile</List.Content>
          </List.Item>
        </List>
        <Link  to="/profile"> <div> <Icon className="angle double left icon large inverted"></Icon> </div></Link> 
      </div>
    );
  }
}

export default withRouter(SettingPage)
