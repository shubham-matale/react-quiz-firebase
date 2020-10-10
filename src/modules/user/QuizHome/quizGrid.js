import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function QuizGrid(props) {
    
  const classes = useStyles();
  const play=() => {
    localStorage.setItem('selectedQuizForPlay',JSON.stringify(props.data));
    
    window.location.pathname="/user/playQuiz"
    
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="https://images.cnbctv18.com/wp-content/uploads/2018/05/10.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.data.quizName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Will End On : {props.data.endDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {props.data.id}
                </Typography>
              </Grid>
              <Grid item>
                <Button color="secondary" style={{ cursor: 'pointer' }} onClick={()=>{
                    play()
                }}> 
                  Play
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{props.data.questionsCount} <br/>Questions</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
