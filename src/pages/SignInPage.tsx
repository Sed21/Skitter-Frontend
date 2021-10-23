import * as React from "react";
import {SignInForm} from "../components/SignInForm";
import {sendSignInForm} from "../api/auth";
import {setAuthData} from "../utils/setauth";

export const SignInPage: React.FC = () => {
  return (
    <div>
      <SignInForm onSubmit={ (values) => {
        sendSignInForm(values)
          .then(response => {
            setAuthData(response);
            window.location.replace('/main');
          })
          .catch(e => console.log(e));
      }}>
      </SignInForm>
    </div>
  )
}