import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Dashboard from './components/dashboard/Dashboard';
import Transaction from './components/Transaction';

Amplify.configure(aws_exports);

const App = () => {


    return(
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path ="/transaction" component={Transaction}/>
        </Switch>
      </Router>
    )
  

}

export default withAuthenticator(App, {includeGreetings: true });