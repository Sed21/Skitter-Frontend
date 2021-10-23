import * as React from 'react';
import {Button, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {Field, Form, Formik} from 'formik';
import {FormField} from "./FormField";

export interface Values {
  username: String,
  password: String,
  role: String,
  errors ?: {}
}

interface Props {
  onSubmit: (values: Values) => void;
}

export const SignUpForm: React.FC<Props> = ({onSubmit}) => {
  const [role, setRole] = React.useState('Listener');

  const handleChange = (event: React.MouseEvent<HTMLElement>, selectedRole: string) => {
    setRole(selectedRole);
  }

  return (
    <Formik
        initialValues={{username: '', password: '', role: ''}}
        onSubmit={(values) => {onSubmit({...values, role: role});}}>
      {({ values}) => (
        <Form style={{ textAlign: "center" }}>
          <ToggleButtonGroup orientation={"horizontal"} value={role} exclusive={true} onChange={handleChange} aria-label={"left alignment"}>
            <ToggleButton value={"Listener"} aria-label={"role-listener"}>Listener</ToggleButton>
            <ToggleButton value={"Creator"} aria-label={"role-creator"}>Creator</ToggleButton>
          </ToggleButtonGroup>
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
