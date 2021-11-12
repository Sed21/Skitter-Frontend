import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from "react";
import { urls, useRouting } from '../routing';

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "100vh",
        height: "auto",
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/welcome-page.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap'
    },
    button: {
        margin: 10,
        backgroundColor: 'red'
    },
    textBox: {
        color: '#e2dfdf',
        width: "30vw",
        fontSize: "40px"
    }
}))

export const WelcomePage = () => {

    const classes = useStyles();
    const { routeTo } = useRouting();

    return (
        <div className={classes.root}>
            <div>
                <Typography className={classes.textBox}>
                    Skitter is an online library for audio books. Feel free to join our community.
                </Typography>
                <div className={classes.container}>
                    <div className={classes.buttonContainer}>
                        <Button onClick={() => routeTo(urls.signUpPage)} className={classes.button}>Sign Up</Button>
                        <Button onClick={() => routeTo(urls.signInPage)} className={classes.button}>Sign In</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}