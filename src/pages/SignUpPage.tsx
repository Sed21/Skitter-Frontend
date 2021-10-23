import * as React from "react";
import {SignUpForm} from "../components/SignUpForm";
import {sendSignUpForm} from "../api/auth";
import {setAuthData} from "../utils/setauth";

export const SignUpPage: React.FC<{}> = () => {
  return (
    <div>
      <SignUpForm onSubmit={ (values) => {
        sendSignUpForm(values)
          .then(response => {
            setAuthData(response);
            window.location.replace('/main');
          })
          .catch(e => console.log(e));
      }}>
      </SignUpForm>
    </div>
  )
}