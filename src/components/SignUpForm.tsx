import * as React from 'react';
import {Button, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {Field, Form, Formik} from 'formik';
import {FormField} from "./FormField";
import { makeStyles } from '@mui/styles';

export interface Values {
  username: string,
  password: string,
  role: string,
  errors ?: any
}

const useStyles = makeStyles((theme: any) => ({
  toggleButtonGroup: {
    textAlign: 'center'
  }
}));

interface Props {
  onSubmit: (values: Values) => void;
}

export const SignUpForm: React.FC<Props> = ({onSubmit}) => {
  
  const classes = useStyles();
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
          <ToggleButtonGroup className={classes.toggleButtonGroup} orientation={"horizontal"} value={role} exclusive={true} onChange={handleChange} aria-label={"center alignment"}>
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
          <Button type={"submit"}>Sign Up</Button>
        </Form>
      )}
    </Formik>
  );
};
