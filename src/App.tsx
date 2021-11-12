import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider, CssBaseline } from "@mui/material"
import { Route, Redirect } from "react-router-dom";
import { route, startUrl, urls } from "./routing";
import { WelcomePage } from "./pages/welcomePage";
import { LoginPage } from "./pages/signInPage";
import { ContentPage } from "./pages/contentPage";
import { ContentEntityPage } from "./pages/contentEntityPage";
import { makeStyles } from "@mui/styles";
import { RegisterPage } from "./pages/signUpPage";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#cecece",
    },
  },
});

const useStyles = makeStyles(() => ({
  App: {
    height: "100vh",
  }
}))

const App = () => {

  const classes = useStyles();
  return (
    <div className={classes.App}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Route exact={true} path={route(urls.signInPage)} component={LoginPage} />
        <Route exact={true} path={route(urls.signUpPage)} component={RegisterPage}/>
        <Route exact={true} path={route(urls.welcomePage)} component={WelcomePage}/>
         <Route exact={true} path={route(urls.contentPage)} component={ContentPage}/>
         <Route exact={true} path={route(urls.contentEntityPage, ["id"])} component={ContentEntityPage}/>
        {/* <Route exact={true} path={route(urls.signUpPage)} component={}/>
        <Route exact={true} path={route(urls.signInPage)} component={}/>
        <Route exact={true} path={route(urls.startPage)} component={}/> */}
        <Route exact={true} path={'/'}>
          <Redirect to={startUrl()} />
        </Route>
      </ThemeProvider>
    </div>
  );
}

export default App;
