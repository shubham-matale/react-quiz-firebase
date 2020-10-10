
import React, { useState,useEffect } from 'react';
import moment from 'moment';
import { SideBar } from "../../../components";
import {
  Avatar,  Box,  Button,  Card,  CardActions,  CardContent,  Divider,  Typography,ButtonGroup,  makeStyles, CardHeader
} from '@material-ui/core';
import { QuestionCard } from "./GameComponet";
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));
function QuizGame() {


  
  const [currentIndex, serCurrentIndex] = useState(0);
  
  // console.log(quizData[0]['id'])
 
  const [loader,setLoader] = useState(false);
  const [selectedQuiz, setSelectedQuiz]=useState([]);
  const [currentQuestion,setCurrentQuestion] = useState({}); 
  useEffect(() => {
      const localRepoItems = localStorage.getItem('selectedQuizForPlay');
      console.log(localRepoItems)
      if (localRepoItems) {
          setSelectedQuiz(JSON.parse(localRepoItems)['questions']);
         
      }
    }, []);

  
    return (
      <SideBar>
        
        <Card >
          <CardHeader
            title={"Question no : "+(currentIndex+1)}
          />
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
        >{selectedQuiz.map((data,index)=>(
          <Box style={{display: currentIndex==index? 'block' : 'none' }}>
          <QuestionCard key={index} currentIndex={index} data={data}/>
          </Box>
        ))}
         
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
      <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
      <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
      <Button  style={{display: currentIndex==0? 'none' : 'block' }} onClick={()=>{
        if(currentIndex>=1){
          let currentIndex1=currentIndex-1;
          serCurrentIndex(currentIndex1)
        }
      }}>Previos</Button>
      <Button style={{display: (currentIndex+1)==selectedQuiz.length? 'none' : 'Block' }} onClick={()=>{
        if(currentIndex<selectedQuiz.length){
          let currentIndex1=currentIndex+1;
          serCurrentIndex(currentIndex1)
        }
      }} >Next</Button>
    </ButtonGroup>
    </Box>
      </CardActions>
    </Card>
      </SideBar>

    );
  

}

export default QuizGame;