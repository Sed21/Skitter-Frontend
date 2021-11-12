import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import { NavBar } from "../components/NavBar";
import { ScrollList } from "../components/ScrollList";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
}))

export const ContentPage = () => {

  const classes = useStyles();

  return (<div className={classes.root}>
    <NavBar />
    <ScrollList />
  </div>)
}