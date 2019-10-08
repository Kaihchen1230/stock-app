import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';



export default function displayStock() {


  return (
    <Grid container  spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={4}>
          {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <Paper style={{color:"black", width:"200px", height: "200px"}}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
      
        
      
    </Grid>
  );
}
