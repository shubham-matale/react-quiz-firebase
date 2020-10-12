
import React, { useState,useEffect } from 'react';
import moment from 'moment';
import { SideBar } from "../../../components";
import {
  Avatar,  Box,  Button,  Card,  CardActions,  CardContent,  Divider,  Typography,ButtonGroup,  makeStyles, CardHeader
} from '@material-ui/core';
import { QuestionCard,SubmitForm  } from "./GameComponet";
import {QuizService} from '../../../services';
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
  const [openSubmitForm, setOpenSubmitForm]=useState(false);
  const [userInfo,setUserInfo]=useState({});
  const [userScore,setUserScore]=useState(0);
  const [loader,setLoader] = useState(false);
  const [selectedQuiz, setSelectedQuiz]=useState([]);
  const [currentQuestion,setCurrentQuestion] = useState({}); 

  const handleAnswer = (index,ans)=>{
    let quizData=selectedQuiz;
    quizData[index]['userAns']=quizData[index][ans];
    setSelectedQuiz(quizData);
  }

  const calculateScore= ()=>{
    let quizData=selectedQuiz;
    let userCorrectAnsCount = 0;
    let totalQuestionCount = quizData.length;
    for(let data of quizData){
      if(data['correctAns']==data['userAns']){
        userCorrectAnsCount++;
      }
    }
    setUserScore(userCorrectAnsCount);
    setOpenSubmitForm(true);

    // alert('Your score is '+userCorrectAnsCount+' out of'+totalQuestionCount);
  }

  const handleUserInfo=(values)=>{
    setUserInfo(values);
    QuizService.updateQuizResult(userScore,values['contactNumber'],values['feedback']);
  }

  useEffect(() => {
      const localRepoItems = localStorage.getItem('selectedQuizForPlay');
      console.log(localRepoItems)
      if (localRepoItems) {
          setSelectedQuiz(JSON.parse(localRepoItems)['questions']);
         
      }
    }, []);

  
    return (
      <SideBar>
        <Box
        display="flex"
        justifyContent="flex-end"
        mb={2}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={calculateScore}
        >
          Submit Quiz
        </Button>
      </Box>
        <Card >
          <CardHeader
            title={"Question no : "+(currentIndex+1)+" out of "+selectedQuiz.length}
          />
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
        >{selectedQuiz.map((data,index)=>(
          <Box style={{display: currentIndex==index? 'block' : 'none',margin:2 }} boxShadow={3}>
          <QuestionCard key={index} onAnswerChange={handleAnswer} currentIndex={index} data={data}/>
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
    <SubmitForm openForm={openSubmitForm} setUserInfo={handleUserInfo} closeForm={()=>{setOpenSubmitForm(false)}}></SubmitForm>
      </SideBar>

    );
  

}

export default QuizGame;