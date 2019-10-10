import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core';
import * as queries from '../graphql/queries';
import {Auth, API, graphqlOperation } from 'aws-amplify';


class Transaction extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isReady: false,
            transactions: {}
        }
    }

    componentDidMount = async () => {
        console.log('did mount')
        Auth.currentAuthenticatedUser()
        .then(async user => {
            console.log('this is user: ', user)
            const currentUserData = await API.graphql(graphqlOperation(queries.getUser, {id: user.attributes.sub}));
            console.log('this is data: ', currentUserData.data)
            this.setState({
                transactions: currentUserData.data.getUser.stockTransaction.items,
                isReady: true
                
            })
        })
    }

    renderRow = () => {
        const local = this.state.transactions;
        return(
            local.map(transaction => (
                <TableRow key={transaction.id}>
                <TableCell align="center">
                    Purchased
                </TableCell>
                <TableCell align="center">
                    {transaction.stockSymbol.toUpperCase()}
                </TableCell>
                <TableCell align="center">
                    {transaction.shareAmount}
                </TableCell>
                <TableCell align="center">
                    ${transaction.cost.toFixed(2)}
                </TableCell>
             </TableRow>
            )
        )
        )
    }

    render(){
        console.log('render', Object.keys(this.state.transactions).length)
        return(
            <div style={{textAlign: 'center'}}>
                <h1> Transaction</h1>
                <Paper >
                    <Table >
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Action</TableCell>
                            <TableCell align="center">Ticker Symbol</TableCell>
                            <TableCell align="center">Share Amount</TableCell>
                            <TableCell align="center">Cost</TableCell>
                            
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.isReady ? this.renderRow() : null}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
    
}

export default Transaction;