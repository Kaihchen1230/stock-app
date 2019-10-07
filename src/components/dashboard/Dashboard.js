import React from 'react';
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries';
import Amplify, {Auth, API, graphqlOperation } from 'aws-amplify';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {TextField, Grid, Button} from '@material-ui/core';
import { async } from 'q';


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
            API_KEY: process.env.REACT_APP_STOCK_API_KEY,
            currentUser: {},
            tickerSymbol: '',
            share: 0,
            stockInfo: {},
            validStock: true
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

    handleShareChange = (event) => {
        event.preventDefault();

        const share = event.target.value;
        console.log('this is quantity: ', share);

        this.setState({
            share: share
        })

    }

    buyStack = async () => {
        console.log('this is the stock info: ', this.state.stockInfo)
        // const {data} = await API.graphql(graphqlOperation(mutations.createStock, {}))
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        let form = document.querySelector('#purchase-form');
        form.reset();

        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.tickerSymbol}&apikey=${this.state.API_KEY}`)
            .then(res => {
                const stockInfo = res.data;
                console.log('this is the stockInfo: ', stockInfo)
                this.setState({
                    stockInfo: stockInfo
                }, ()=> console.log('this is stockInfo: ', this.state.stockInfo))
                if(!stockInfo.hasOwnProperty('Error Message')){
                    this.buyStack();
                }
            })
        
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
                                label="Share"
                                type="number"
                                id="share-input"
                                onChange={this.handleShareChange}
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