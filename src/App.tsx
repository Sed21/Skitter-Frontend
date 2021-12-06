import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider, CssBaseline } from "@mui/material"
import { Route, Redirect } from "react-router-dom";
import { route, startUrl, urls } from "./routing";
import { WelcomePage } from "./pages/welcomePage";
import { LoginPage } from "./pages/signInPage";
import { ContentPage } from "./pages/contentPage";
import { AddContent } from "./pages/addContent";
import { ContentEntityPage } from "./pages/contentEntityPage";
import { makeStyles } from "@mui/styles";
import { RegisterPage } from "./pages/signUpPage";
import { FavoritesPage } from "./pages/favoritesPage";
import { AccountPage } from "./pages/accountPage";
import { AdminPage } from "./pages/adminPage";
import { SearchContextProvider } from "./contexts/search";


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
      <SearchContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Route exact={true} path={route(urls.signInPage)} component={LoginPage} />
          <Route exact={true} path={route(urls.signUpPage)} component={RegisterPage}/>
          <Route exact={true} path={route(urls.welcomePage)} component={WelcomePage}/>
          <Route exact={true} path={route(urls.contentPage)} component={ContentPage}/>
          <Route exact={true} path={route(urls.contentEntityPage, ["id"])} component={ContentEntityPage}/>
          <Route exact={true} path={route(urls.addContent)} component={AddContent}/>
          <Route exact={true} path={route(urls.favoritesPage)} component={FavoritesPage}/>
          <Route exact={true} path={route(urls.accountPage, ["id"])} component={AccountPage}/>
          <Route exact={true} path={route(urls.adminPage)} component={AdminPage}/>
          {/* <Route exact={true} path={route(urls.startPage)} component={}/> */}
          <Route exact={true} path={'/'}>
            <Redirect to={startUrl()} />
          </Route>
        </ThemeProvider>
      </SearchContextProvider>
    </div>
  );
}

export default App;
