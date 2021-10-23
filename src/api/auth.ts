import {Values as SignUpValues} from "../components/SignUpForm";
import {Values as SignInValues} from "../components/SignInForm";
import {SignInResponse, SignUpResponse} from "../types";

const authUrl = 'http://127.0.0.1:8080/api/auth';

export async function sendSignUpForm(values: SignUpValues): Promise<SignUpResponse> {
  const options = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  };
  const response = await fetch(authUrl + '/signup', options)
  return await response.json();
}

export async function sendSignInForm(values: SignInValues): Promise<SignInResponse> {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  };
  const response = await fetch(authUrl + '/signin', options)
  return await response.json();
}