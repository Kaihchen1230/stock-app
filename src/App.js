import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Dashboard from './components/dashboard/Dashboard';
import Transaction from './components/Transaction';
import {Divider, Grid, Button} from '@material-ui/core';

Amplify.configure(aws_exports);

const App = () => {


    return(
      
        
        <Router>
        <Grid container alignItems="center" style={{
          display: "flex",
          margin: "20px 0",
          justifyContent: "flex-end"
        }}>
          <Button>
          <a href="/">Dashboard</a>
          </Button>
          
          <Button style={{marginRight: "20px"}}>
          <a href="/transaction">Transaction</a>
          </Button>
          
        </Grid>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path ="/transaction" component={Transaction}/>
        </Switch>
      </Router>
      
    )
  

}

export default withAuthenticator(App, {includeGreetings: true });