import React from "react";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import { Divider } from "semantic-ui-react";

const FormsContainer = ({ submitSignUp, submitSignIn }) => {
  return (
    <div>
      <div className="forms-container">

        <div className="sign-up">
          <SignInForm submitSignIn={submitSignIn} />
        </div>
        <div className="sign-in">
          <SignUpForm submitSignUp={submitSignUp} />
        </div>
        <Divider vertical></Divider>

      </div>
      </div>
  );
};

export default FormsContainer;
