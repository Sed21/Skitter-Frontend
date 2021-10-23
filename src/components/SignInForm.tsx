import * as React from 'react';
import {Button} from '@mui/material';
import {Field, Form, Formik} from 'formik';
import {FormField} from "./FormField";

export interface Values {
  username: String,
  password: String,
  errors ?: {}
}

interface Props {
  onSubmit: (values: Values) => void;
}

export const SignInForm: React.FC<Props> = ({onSubmit}) => {
  return (
    <Formik
      initialValues={{username: '', password: ''}}
      onSubmit={(values) => {onSubmit(values);}}>
      {({ values}) => (
        <Form style={{ textAlign: "center" }}>
          <div>
            <Field
              type={"text"}
              name={"username"}
              placeholder={"Username"}
              component={FormField}
            />
          </div>
          <div>
            <Field
              type={"password"}
              name={"password"}
              placeholder={"Password"}
              component={FormField}
            />
          </div>
          <Button type={"submit"}>Sign In</Button>
        </Form>
      )}
    </Formik>
  );
};
