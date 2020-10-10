import React, {useState, useEffect}from 'react';
import clsx from 'clsx';
import { SideBar } from '../../../components/index';
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline,Typography, Divider, Box} from '@material-ui/core';
import QuizGrid from './quizGrid';
import {firestore} from '../../../firebase';


export default function QuizList() {
    const [quizData,setQuizData] = useState([]);

    useEffect(() => {
        
        let allUserData = [];
        firestore.collection('quizes').get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              
                allUserData.push({id:doc.id, ...doc.data()})
              
              
          });
          setQuizData(allUserData);
        });
      });
  return (
  <SideBar>
      {quizData.map((quiz,i)=>(
          <Box mb={2} key={i}>
        <QuizGrid  data={quiz}/>
       
        </Box>
      ))}
      
  </SideBar>
  );
}
