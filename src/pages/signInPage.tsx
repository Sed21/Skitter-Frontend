import { Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from "react";
import { urls, useRouting } from "../routing";
import { Copyright } from "../components/Copyright";
import { SignInResponse } from "../types/auth";
import { headers } from "../services/config";
import { signIn } from "../services/auth";
// import { UserContext } from "../../contexts/userContext";
// import { urls, useRouting } from "../../routing/routes";
// import { userLogin } from "../../services/auth-service";
// import { headers } from "../../services/config";

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    height: "100vh"
  },
  formContainer:{
    alignSelf: 'center',
    alignItems: 'center'
  }
}));

export type LoginForm = {
  username: string;
  password: string;
};

export const LoginPage = () => {

  const classes = useStyles();
  const { routeTo } = useRouting();
  const [error, setError] = useState<string>("");
  // const [, setUserContext] = useContext(UserContext);

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (credentials: LoginForm) => {
    try {
      const user: SignInResponse = await signIn(credentials);
      localStorage.setItem('id', user.id);
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', user.role);
      localStorage.setItem('token', user.token);
      localStorage.setItem('token_expr_date', user.token_expr_date.toString())
      //set user context
      headers.Authorization = user.token;
      routeTo(urls.contentPage);
    } catch (e: any) {
      setError(e.statusText);
    }
  }

  return (<Formik initialValues={initialValues} onSubmit={onSubmit}>
    {({ handleChange, values }) => {

      return (
        <div className={classes.container}>
          <Grid item xs={3} component={Paper} className="formContainer" elevation={6} square>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5" fontWeight={500}>
                Enter account
              </Typography>
              <Form className={classes.form} noValidate autoComplete="">
                {/* component */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  value={values.username}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {error ? (
                  <div>
                    <p>Invalid Username or Password</p>
                  </div>
                ) : (
                  <div />
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                  <Button onClick={() => routeTo(urls.signUpPage)}>Go to register</Button>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </Form>
            </div>
          </Grid>
        </div>
      );
    }}
  </Formik>
  );
};