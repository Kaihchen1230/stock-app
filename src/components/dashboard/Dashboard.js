import React from 'react';
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries';
import Amplify, {Auth, API, graphqlOperation } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import {TextField, Grid, Button} from '@material-ui/core';


const dashBoardStyle = () => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: "20px",
        textAlign: 'center',
        color: "blue",
        border: "0 solid white"
      },
    div:{
        marginBottom: "20px"
    }
})

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            currentUser: {},
            tickerSymbol: '',
            quantity: 0
        }
    }

    createUser = async () => {
        try{
            const { email, sub } = this.state.currentUser.attributes;
            const payload = {
                id: sub,
                email: email,
                username: this.state.currentUser.username,
                balance: 5000
            }
    
            const { data } = await API.graphql(graphqlOperation(mutations.createUser, {input: payload}));

            console.log('this is data from mutations: ', data)

        }catch(error){
            console.log('there is an error to create the user: ', error)
        }
    }

    checkUserExisted =  async () => {
        
        try{
            // console.log('this is the state in the checkuser: ', this.state)
            const id = this.state.currentUser.attributes.sub;
            const { data } = await API.graphql(graphqlOperation(queries.getUser, {id: id}));
            console.log('this is the data from query: ',data.getUser)

            // user not existed, so create user into the user table
            if(!data.getUser){
                this.createUser();
            }else{
                console.log(data.getUser.username, ' already existed');
            }
        }catch(error){
            console.log('there is error to fetch user data: ', error);
        }
    }

    componentDidMount = async () => {
        
        Auth.currentAuthenticatedUser()
        .then(user => {
            console.log('this is user: ', user)
            this.setState({
                currentUser: user
            })
        }).then(async () => {  
            this.checkUserExisted();
        })
    }

    handleSymbolChange = (event) => {
        event.preventDefault();

        const tickerSymbol = event.target.value;
        console.log('this is tickerSYmbol: ', tickerSymbol)
        this.setState({
            tickerSymbol: tickerSymbol
        })
    }

    hndleQuantityChange = (event) => {
        event.preventDefault();

        const quantity = event.target.value;
        console.log('this is quantity: ', quantity);

        this.setState({
            quantity: quantity
        })

    }

    handleSubmit = async event => {
        event.preventDefault();
        
        let quantityInput = document.querySelector('#purchase-form');
        quantityInput.reset();
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form id="purchase-form" onSubmit={this.handleSubmit}>
                            <div className={classes.div}>
                                <TextField 
                                label="Ticker Symbol"
                                
                                onChange={this.handleSymbolChange}
                                />
                            </div>
                            <div className={classes.div}>
                                <TextField 
                                label="Quantity"
                                type="number"
                                id="quantity-input"
                                onChange={this.hndleQuantityChange}
                                />
                            </div>
                            <div className={classes.div}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(dashBoardStyle)(Dashboard);