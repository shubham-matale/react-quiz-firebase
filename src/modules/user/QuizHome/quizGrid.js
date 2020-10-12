import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button, Chip, Tooltip, Card, CardActionArea, CardActions,CardContent,Divider  } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const windowWidth = window.innerWidth
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
    [theme.breakpoints.down("sm")]: {
      width: `calc(100% - ${windowWidth}px)`,
    },
    [theme.breakpoints.down('xs')]: {
      width: "100%",
    },
    width: 256,
    

  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    
  },
  backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
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
      
      
        <Card className={classes.paper}>
          <CardActionArea>
          <CardContent>
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
              <Grid item >
             <Chip label={props.data.questionsCount+" Questions"}></Chip> 
            </Grid>
              
            </Grid>
            
          </Grid>
          
          
        </Grid>

          </CardContent>
          <Divider></Divider>
          </CardActionArea>
          <CardActions>
          <Button variant="outlined" color="primary" style={{ cursor: 'pointer' }} onClick={()=>{
                    play()
                }}> 
                  Play
                </Button>
          </CardActions>
        </Card>
        
      
    </div>
  );
}
