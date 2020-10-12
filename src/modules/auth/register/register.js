import React, { useState } from "react";
import { Grid, AppBar, Toolbar, Link, Typography, Button, TextField, Fade, Paper,Snackbar , IconButton, CircularProgress,Backdrop } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from "react-router-dom";
import useStyles from '../style';
import {auth} from './../../../firebase';
import AuthService from '../../../services/authService';


function Register(){
  var classes = useStyles();
  const [email, setEmail] = useState('');
  const [openLoader, setOpenLoader] = React.useState(false);
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  const handleLoaderToggle = () => {
    setOpenLoader(!openLoader);
  };
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
    else if (name === 'userDisplayName') {
      setDisplayName(value);
    }
  };

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      AuthService.generateUserDocument(user, {displayName});
      // console.log(result.user.uid)
      // let userDetails =  AuthService.getUserDetails(result.user.uid)
      // localStorage.getItem('userDetails',JSON.stringify(userDetails));
      // console.log(userDetails);
      // if(userDetails.hasOwnProperty('role')&&userDetails['role']=='admin'){
      //   window.location.pathname="/admin/allQuiz"
      // }else{
      //   window.location.pathname="/user/allQuizs"
      // }
    }
    catch(error){
      setError('Error Signing up with email and password');
      setMessageInfo(error.message);
      setOpen(true);
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

    return (
      <div>
        <Backdrop className={classes.backdrop} open={openLoader} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar position="static" alignitems="center" color="primary">
        <Toolbar>
          <Grid container justify="center" wrap="wrap">
            <Grid item>
              <Typography variant="h6">Quiz App</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid spacing={0}
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
              <Grid item spacing={5}>
                <form >
                  <Grid container direction="column" spacing={2}>
                  <Grid item>
                      <TextField
                        type="text"
                        placeholder="Name"
                        fullWidth
                        name="userDisplayName"
                        value={displayName}
                        onChange={(event) => onChangeHandler(event)}
                        required
                        autoFocus
                      />
                    </Grid>
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
                          createUserWithEmailAndPasswordHandler(event, email, password);
                        }}
                      >
                        Sign Up
                    </Button>
                    <br/>
                    <Box mt={1}>
                      <Button
                      
                          variant="contained"
                          color="secondary"
                          disableElevation
                        ><Link href='/' className={classes.LinkbuttonBlock}>
                        Login
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

export default Register;