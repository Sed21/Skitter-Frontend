import React from 'react';
import {SignUpPage} from './pages/SignUpPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {SignInPage} from "./pages/SignInPage";
import {MainPage} from "./pages/MainPage";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact={true} path={'/signup'} component={SignUpPage}/>
          <Route exact={true} path={'/signin'} component={SignInPage}/>
          <Route exact={true} path={'/main'} component={MainPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
