import React from 'react';
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries';
import Amplify, {Auth, API, graphqlOperation } from 'aws-amplify';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {TextField, Grid, Button} from '@material-ui/core';
import { async } from 'q';
import { updateExpression } from '@babel/types';


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
    },
    Grid:{
        textAlign: "center"
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
            validStock: true,
            userData: {},
            stockId: "",
            transactionId: "",
            balance: 0,
            ownedStocks: [],
            totalShare: 0
        }
    }

    createUser = async () => {
        try{
            console.log('this is the user in the state: ', this.state.user)
            const { email, sub } = this.state.currentUser.attributes;
            const payload = {
                id: sub,
                email: email,
                username: this.state.currentUser.username,
                balance: 5000
            }
    
            const { data } = await API.graphql(graphqlOperation(mutations.createUser, {input: payload}));

            console.log('this is data from mutations: ', data)
            this.setState({
                userData: data,
                balance: 5000
            })

        }catch(error){
            console.log('there is an error to create the user: ', error)
        }
    }

    checkUserExisted =  async () => {
        
        try{
            // console.log('this is the state in the checkuser: ', this.state.currentUser)
            const id = this.state.currentUser.attributes.sub;
            const { data } = await API.graphql(graphqlOperation(queries.getUser, {id: id}));
            console.log('this is the data from query: ',data.getUser)

            // user not existed, so create user into the user table
            if(!data.getUser){
                this.createUser();
            }else{
                // console.log(data.getUser.username, ' already existed');
                this.setState({
                    userData: data.getUser,
                    balance: data.getUser.balance,
                    ownedStocks: data.getUser.stocks.items
                }, () => {console.log('this is the ownedStock for the state:  ', this.state.ownedStocks)})
            }
        }catch(error){
            console.log('there is error to fetch user data in checkuserexisted: ', error);
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
            // console.log('this is the currentUser in didmount: ', this.state.currentUser)
            this.checkUserExisted();
        })
    }

    handleSymbolChange = (event) => {
        event.preventDefault();

        const tickerSymbol = event.target.value;
        this.setState({
            tickerSymbol: tickerSymbol
        })
    }

    handleShareChange = (event) => {
        event.preventDefault();

        const share = event.target.value;

        this.setState({
            share: share
        })

    }
    getLastFridayOf(date) {
        let d = new Date(date),
            day = d.getDay(),
            diff = (day <= 5) ? (7 - 5 + day ) : (day - 5);
    
        d.setDate(d.getDate() - diff);
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
    
        return d;
    }

    // createStock = async stock => {
    //     try{
    //         await API.graphql(graphqlOperation(mutations.createStock, {input: stock}))
    //             .then(async res => {
    //                 console.log('this is stock data: ',res.data)
    //                 this.setState({
    //                     stockId: res.data.createStock.id,
    //                 }, () => {console.log('this is stockId: ', this.state.stockId)})
    //             })
            
    //     }catch(error){
    //         console.log('there is an error to create a stcock: ', error)
    //     }
    // }

    // createTransaction = async transaction => {
    //     try{
    //         await API.graphql(graphqlOperation(mutations.createTransaction, {input: transaction}))
    //             .then(async res => {
    //                 console.log('this is tran data: ', res.data)
    //                 this.setState({
    //                     transactionId: res.data.createTransaction.id
    //                 }, ()=> {console.log('this is transactionId: ', this.state.transactionId)})
    //             })
            
                
    //     }catch(error){
    //         console.log("there is an error to create the transaction: ", error)
    //     }
    // }

    

    buyStack = async () => {
        console.log('this is the stock info inside of buystock: ', this.state.stockInfo)
        // const {data} = await API.graphql(graphqlOperation(mutations.createStock, {}))
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1
        const currentDay = (today.getDate() < 10 ? '0' + today.getDate() : today.getDate)
    
        let currentDate = currentYear + '-' + currentMonth + '-' + currentDay;
        const currentHour = today.getHours();
        const currentMin = today.getMinutes();
        let lastFriday = this.getLastFridayOf(today);
        if(currentHour < 9 || (currentHour >= 9 && currentMin < 35)){
            alert('the stock market is not opened yet!! Will be using last week firday data');
            // return;
            const lastFridayYear = lastFriday.getFullYear();
            const lastFridayMonth = lastFriday.getMonth() + 1;
            const lastFridayDay = (lastFriday.getDate() < 10 ? '0' + lastFriday.getDate() : lastFriday.getDate());
            // will change this when everything is working
            currentDate = lastFridayYear + '-' + lastFridayMonth + '-' + lastFridayDay;
            // console.log('this is last friday: ', currentDate);
        }
        

        const todayStockData = this.state.stockInfo['Time Series (Daily)'][currentDate];
        console.log('this is todayStockData: ', todayStockData)
        const open = parseFloat(todayStockData['1. open']);
        const high = parseFloat(todayStockData['2. high']);
        const low = parseFloat(todayStockData['3. low']);
        const close = parseFloat(todayStockData['4. close']);
        console.log('this is open: ', open, '\nthis is high: ', high, '\nthis is low: ', low, '\nthis is close: ', close);

        const cost = this.state.share * open;
        // console.log('this is cost: ', cost)
        
        if(this.state.balance >= cost){
            const remain = this.state.balance - cost
            const userId = this.state.currentUser.attributes.sub;

            const ownedStocks = this.state.ownedStocks;
            console.log('this is ownedStock: ', ownedStocks)
            
            

            ownedStocks.forEach(async (item, i) => {
                if(item.symbol.toUpperCase() === this.state.tickerSymbol.toUpperCase()){
                    console.log('user already bought the current stock, just update it in db');
                    this.setState({
                        stockId: item.id,
                        totalShare: this.state.share + item.shareAmount
                    }, () => {console.log('this is stockId in for each: ', this.state.stockId)})
                    // currentStockId = item.id;
                    // totalShare = this.state.share + item.shareAmount;
                }
            })

            // console.log('this is the stockId outside of the foreach: ', this.state.stockId)
            if(this.state.stockId){
                // console.log('this is the current stock id inside of the if statmenet after foreach: ', currentStockId);
                // console.log('this is total share in side of if: ', totalShare)
                const updateStockInput = {
                    id: this.state.stockId,
                    priceOpen: open,
                    dayHigh: high,
                    dayLow: low,
                    dayClose: close,
                    stockOwnerId: userId,
                    shareAmount: this.state.totalShare

                }
                await API.graphql(graphqlOperation(mutations.updateStock, {input: updateStockInput}))
                    .then(async res => {
                        console.log('already exist the current stock, and here is the update version: ', res.data)
                    })
            }else{
                const stockInput = {
                    symbol: this.state.tickerSymbol,
                    priceOpen: open,
                    dayHigh: high,
                    dayLow: low,
                    dayClose: close,
                    stockOwnerId: userId,
                    shareAmount: this.state.share
                }
    
                await API.graphql(graphqlOperation(mutations.createStock, {input: stockInput}))
                    .then(async res => {
                        console.log('this is stock data: ',res.data)
                        this.setState({
                            stockId: res.data.createStock.id,
                        }, () => {console.log('this is stockId: ', this.state.stockId)})
                    })
            }
            
            const userInput = {
                id: userId,
                balance: remain
            }

            await API.graphql(graphqlOperation(mutations.updateUser, {input: userInput}))
                .then(async res => {
                    console.log('this is the user data after buy the stock: ', res.data)
                })
            console.log('this is userdata in buy stock: ', this.state.userData)
            
            

            const transactionInput = {
                shareAmount: this.state.share,
                transactionOwnerId: userId,
                transactionStockId: this.state.stockId
            }

            await API.graphql(graphqlOperation(mutations.createTransaction, {input: transactionInput}))
                .then(async res => {
                    console.log('this is tran data: ', res.data)
                    this.setState({
                        transactionId: res.data.createTransaction.id
                    }, ()=> {console.log('this is transactionId: ', this.state.transactionId)})
                })

            const {data} = await API.graphql(graphqlOperation(queries.getUser, {id: userId} ));
            console.log('this is user data after everything: ', data)
            this.setState({
                balance: remain,
                stockId: ''
            })

        }else{
            alert('your balance is not enough!!!')
        }
        
        
        
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        let form = document.querySelector('#purchase-form');
        form.reset();

        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.tickerSymbol}&apikey=${this.state.API_KEY}`)
            .then(res => {
                const stockInfo = res.data;
                console.log('this is the stockInfo in handle submit: ', stockInfo)
                this.setState({
                    stockInfo: stockInfo
                }, ()=> console.log('this is the state stockInfo in the handlesubmit: ', this.state.stockInfo))

                if(!stockInfo.hasOwnProperty('Error Message')){
                    this.buyStack();
                }else{
                    alert(`${this.state.tickerSymbol} doesn't existed!!!!`)
                }
            })
        
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {/* to display the data */}
                    <Grid item xs={12} sm={6} className={classes.Grid}>
                        <h2>Portfoil: </h2>
                    </Grid>
                    {/* form to ask user to purchase the stock */}
                    <Grid item xs={12} sm={6}>
                        <h2>Balance: {this.state.balance}</h2>
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