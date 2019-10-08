import React from 'react';
import {Paper, Grid} from '@material-ui/core';

const displayStock = (props) => {


    return (
        <Grid container  spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                {props.stocks.map(stock => (
                    <Grid key={stock.id} item>
                    <Paper style={{color:"#BED0C5", width:"220px", height: "200px", paddingTop:"20px", backgroundColor: stock.purchasedPrice > stock.dayOpen ? "#3EB96F" : stock.purchasedPrice === stock.dayOpen ? "#686464" : "#F67672" }}>
                        <h3>Ticker Symbol: {stock.symbol.toUpperCase()}</h3>
                        <h3>Share: {stock.shareAmount}</h3>
                        <h3>Value: ${(stock.dayOpen * stock.shareAmount).toFixed(2)}</h3>
                    </Paper>
                    </Grid>
                ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default displayStock;
