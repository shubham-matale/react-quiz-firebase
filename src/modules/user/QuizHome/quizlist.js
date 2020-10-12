import React, {useState, useEffect}from 'react';
import clsx from 'clsx';
import { SideBar } from '../../../components/index';
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline,Typography, Divider, Box,Backdrop,CircularProgress} from '@material-ui/core';
import QuizGrid from './quizGrid';
import {firestore} from '../../../firebase';


const useStyles = makeStyles((theme) => ({
  backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  
}));

export default function QuizList() {
    const classes = useStyles();
    const [quizData,setQuizData] = useState([]);
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
      setOpen(false);
    };
    useEffect(() => {
        
        let allUserData = [];
        firestore.collection('quizes').get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let docData=doc.data();
            let startDate = docData['startDate'].split('-');
            let endDate=docData['endDate'].split('-');
            console.log(new Date(parseInt(startDate[0]),parseInt(startDate[1]-1),parseInt(startDate[2])), new Date(parseInt(endDate[0]),parseInt(endDate[1]-1),parseInt(endDate[2])));
              if(new Date(parseInt(startDate[0]),parseInt(startDate[1]-1),parseInt(startDate[2]))<=new Date() &&new Date(parseInt(endDate[0]),parseInt(endDate[1]-1),parseInt(endDate[2]))>=new Date())
                allUserData.push({id:doc.id, ...doc.data()})
              
              
          });
          
          handleClose(false);
          setQuizData(allUserData);
        });
      });
  return (
  <SideBar>
     <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
      {quizData.map((quiz,i)=>(
          <Box mb={2} key={i}>
        <QuizGrid  data={quiz}/>
       
        </Box>
      ))}
      
  </SideBar>
  );
}
