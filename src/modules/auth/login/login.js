import React, { useState, useContext } from "react";
import { Grid, AppBar, Toolbar, Link, Typography, Button, TextField, Fade, Paper,Snackbar , IconButton } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from "react-router-dom";
import useStyles from '../style';
import {UserContext} from '../../../providers/userProvider';
import { auth, generateUserDocument } from "../../../firebase";
import { Redirect } from 'react-router-dom';
import { AuthService } from '../../../services'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


function Login() {

  const classes = useStyles();
  const [openLoader, setOpenLoader] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  
  const handleLoaderToggle = () => {
    setOpenLoader(!openLoader);
  };

  if(AuthService.isLoggedIn()){
    if(AuthService.isUserAdmin()){
      window.location.pathname="/admin/allQuiz"
    }else{
      window.location.pathname="/user/allQuizs"
    }
  }
  
  // const user = useContext(UserContext);
  


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  }
 

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password).then(function(result) {
     console.log(result.user.uid)
      AuthService.getUserDetails(result.user.uid)
      
      
    }).catch(error => {
      setMessageInfo(error.message);
      setOpen(true);
      console.error("Error signing in with password and email", error.message);
    });
  };

  return (
    <div>
       
      <AppBar position="static" alignitems="center" color="primary">
        <Toolbar>
          <Grid container justify="center" wrap="wrap">
            <Grid item>
              <Typography variant="h6">Quiz App</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Backdrop className={classes.backdrop} open={openLoader} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container
        align="center"
        justify="center"
        direction="column" >
        <Grid item>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.paper_top}
          >
            <Paper
              variant="elevation"
              elevation={3}
              className={classes.login_background}

            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in</Typography>
              </Grid>
              <Grid item >
                <form >
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="userEmail"
                        value={email}
                        onChange={(event) => onChangeHandler(event)}
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="userPassword"
                        value={password}
                        onChange={(event) => onChangeHandler(event)}
                        required

                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.buttonBlock}
                        disableElevation
                        onClick={event => {
                          handleLoaderToggle();
                          signInWithEmailAndPasswordHandler(event, email, password);
                        }}
                      >
                        Login
                    </Button>
                    <br/>
                    <Box mt={1}>
                      <Button
                      
                          variant="contained"
                          color="secondary"
                          disableElevation
                        ><Link href='/register' className={classes.LinkbuttonBlock}>
                        Register
                      </Link>
                      </Button>
                    </Box>
                    
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Link href="/resetPassword" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={messageInfo}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      </Grid>
      
    </div>
  );
}

export default Login;