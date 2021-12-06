import { Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from "react";
import { urls, useRouting } from "../routing";
import { Copyright } from "../components/Copyright";
import { signUp } from "../services/auth";
import { SignUpInfo, SignUpResponse } from "../types/auth";
import { headers } from "../services/config";

interface Props {
    onSubmit: (values: SignUpInfo) => void;
}


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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/welcome-page.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh"
    },
    formContainer: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    toggleButtonsGroup: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
}));

export const RegisterPage = () => {

    const [role, setRole] = React.useState('Listener');

    const handleRoleChange = (event: React.MouseEvent<HTMLElement>, selectedRole: string) => {
        setRole(selectedRole);
    }

    const classes = useStyles();
    const { routeTo } = useRouting();
    const [error, setError] = useState<string>("");

    const initialValues = {
        username: '',
        password: '',
        role: 'Listener'
    }

    const onSubmit = async (credentials: SignUpInfo) => {
        try {
            const user: SignUpResponse = await signUp(credentials);
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
                                New account
                            </Typography>
                            <Form className={classes.form} noValidate>
                                <ToggleButtonGroup className={classes.toggleButtonsGroup} orientation={"horizontal"} value={role} exclusive={true} onChange={handleRoleChange} aria-label={"center alignment"}>
                                    <ToggleButton value={"Listener"} aria-label={"role-listener"}>Listener</ToggleButton>
                                    <ToggleButton value={"Creator"} aria-label={"role-creator"}>Creator</ToggleButton>
                                </ToggleButtonGroup>
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
                                    Sign Up
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Button onClick={() => routeTo(urls.signInPage)}>Go to login page</Button>
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