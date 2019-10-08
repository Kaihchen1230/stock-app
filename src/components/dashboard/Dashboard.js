import React from 'react';
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries';
import Amplify, {Auth, API, graphqlOperation } from 'aws-amplify';
import axios from 'axios';
import DisplayStock from './displayStock';
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
            userId: "",
            transactionId: "",
            balance: 0,
            ownedStocks: [],
            totalShare: 0,
            portfolio: 0
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
                userId: data.getUser.id,
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
                    userId: data.getUser.id,
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

    calcuatePortfolio = () => {

        if(this.state.ownedStocks.length){
            let currentPortfolio = 0;
            this.state.ownedStocks.forEach((stock, ind) => {
                currentPortfolio += (stock.shareAmount * stock.priceOpen)
            })
            return currentPortfolio
        }
        return 0
    }

    async componentDidUpdate() {

        try{
            const {data} = await API.graphql(graphqlOperation(queries.getUser, {id: this.state.userId}));
            this.setState({
            ownedStocks: (data.getUser.stocks ? data.getUser.stocks.items : []),
            portfolio: this.calcuatePortfolio(),
            balance: data.getUser.balance
            })
        }catch(error){
            console.log('there is an error in component did update to fetch data: ', error)
        }
        
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

        const share = parseInt(event.target.value);

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
            
            const currentStockId = userId + this.state.tickerSymbol.toUpperCase();

            ownedStocks.forEach(async (item, ind) => {
                if(item.id.toUpperCase() === currentStockId.toUpperCase()){
                    this.setState({
                        stockId: currentStockId,
                        totalShare: this.state.share + item.shareAmount
                    })
                }
            })
            console.log('this is the state: ', this.state)
            if(this.state.stockId){
                try{
                    const updateStockInput = {
                        id: this.state.stockId,
                        shareAmount: this.state.totalShare,
                        priceOpen: open,
                        dayHigh: high,
                        dayLow: low,
                        dayClose: close
                    }

                    const {data} = await API.graphql(graphqlOperation(mutations.updateStock, {input: updateStockInput}))
                    console.log('this is the update stockinfo: ', data)
                }catch(error){
                    console.log('there is an error to update the stock: ', error)
                }
                
            }else{
                try{

                    const createStockInput = {
                        id: currentStockId,
                        symbol: this.state.tickerSymbol,
                        shareAmount: this.state.share,
                        priceOpen: open,
                        dayHigh: high,
                        dayLow: low,
                        dayClose: close,
                        stockOwnerId: userId,
                    
                    }
                    console.log('this is createStockInput: ', createStockInput)
                    const {data} = await API.graphql(graphqlOperation(mutations.createStock, {input: createStockInput}));
                    console.log('this is data for create stock input: ', data);
                }catch(error){
                    console.log('there is an error to create the stock data: ', error)
                }
            }
            
            const transactionInput = {
                shareAmount: this.state.share,
                cost: cost,
                stockSymbol: this.state.tickerSymbol
            }
            
            const {data} = await API.graphql(graphqlOperation(mutations.createTransaction, {input: transactionInput}));
            console.log('this is the transactionInput: ', data);

            const updateUserInput = {
                id: this.state.userId,
                balance: remain
            }

            const updatedUserData = await API.graphql(graphqlOperation(mutations.updateUser, {input: updateUserInput}));
            console.log('this is the updateUserData: ', updatedUserData.data);

            this.setState({
                balance: remain
            })

            console.log('this is state info: ', this.state)
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
                <Grid container spacing={5}>
                    {/* to display the data */}
                    <Grid item xs={12} sm={8} className={classes.Grid}>
                        <h2>Portfolio: ${this.state.portfolio}</h2>
                        <DisplayStock/>
                    </Grid>
                    {/* form to ask user to purchase the stock */}
                    <Grid item xs={12} sm={4}>
                        <h2>Balance: ${this.state.balance}</h2>
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