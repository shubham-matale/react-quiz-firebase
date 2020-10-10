import React, { useState } from "react";
import {Grid, CircularProgress,Typography, Button, Tabs, Tab, TextField, Fade, Paper } from "@material-ui/core";
import { withRouter } from "react-router-dom";

function PasswordReset(){
    const [value, setValue] = React.useState(2);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper square>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab label="Active" />
              <Tab label="Disabled" disabled />
              <Tab label="Active" />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>
    );
}

export default PasswordReset;