import React, {useState} from 'react';
import {
    Box, Card, CardContent, Divider,CardHeader,CardFooter,CircularProgress, Button, Container, Grid,Link,TextField,
    Typography, makeStyles
  } from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {SideBar} from '../../../components';
import {QuizService} from '../../../services';


export default function AddQuiz(props){
    
    const [quizName, setQuizName]  = useState('');
    
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'numeric', year: 'numeric'
    }).replace('/', '-');
    console.log(formattedDate.replace('/','-'));
    const [quizStartTime, setQuizStartTime] = useState('');
    const [quizEndTime, setQuizEndTime] = useState('');
    const [open, setOpen] = React.useState(false);
    const [messageInfo, setMessageInfo] = React.useState(undefined);
    const [loader,setLoader] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  }

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        
        if (name === 'quizName') {
          setQuizName(value);
        }
        else if (name === 'quizStartTime') {
          setQuizStartTime(value);
        }
        else if (name === 'quizEndTime') {
          setQuizEndTime(value);
        }
      };

      const handleSubmit = async (event, quizName, quizStartTime,quizEndTime) => {
        event.preventDefault();
        try{
          
        }
        catch(error){
          setMessageInfo(error.message);
          setOpen(true);
        }
    
        setQuizEndTime('');
        setQuizName('');
        setQuizStartTime('');
      };
    
    return (
        <SideBar>
            <Box
        display="flex"
        flexDirection="row"
        height="100%"
        justifyContent="start"
      ><Card>
      <CardHeader
        subheader="Add Quiz Information"
        title="New Quiz"
      />
      <Divider />
      <CardContent>
          {loader?
          <Box
          display="flex"
          flexDirection="row"
          height="100%"
          justifyContent="center"
        ><CircularProgress /></Box>:
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              quizName: quizName,
              quizStartTime: quizStartTime,
              quizEndTime : quizEndTime
            }}
            validationSchema={Yup.object().shape({
                quizName: Yup.string().max(255).required('Quiz Name is required'),
              quizStartTime: Yup.date().required('Start Date is required'),
              quizEndTime: Yup.date().required('End Time is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setLoader(true);
                QuizService.createNewQuiz(values.quizName,values.quizStartTime,values.quizEndTime);
                props.history.push('/admin/allQuiz');
              }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>               
                <Box
                  mt={3}
                  mb={1}
                >
                  
                </Box>
                <TextField
                  error={Boolean(touched.quizName && errors.quizName)}
                  fullWidth
                  helperText={touched.quizName && errors.quizName}
                  label="Quiz Name"
                  margin="normal"
                  name="quizName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  
                />
                <TextField
                  error={Boolean(touched.quizStartTime && errors.quizStartTime)}
                  fullWidth
                  helperText={touched.quizStartTime && errors.quizStartTime}
                  label="Start Time"
                  margin="normal"
                  name="quizStartTime"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="date"
                  value={values.quizStartTime}
                  
                />
                <TextField
                  error={Boolean(touched.quizEndTime && errors.quizEndTime)}
                  fullWidth
                  helperText={touched.quizEndTime && errors.quizEndTime}
                  label="End Time"
                  margin="normal"
                  name="quizEndTime"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="date"
                  value={values.quizEndTime}
                  
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add Quiz
                  </Button>
                </Box>
                
              </form>
            )}
          </Formik>
        </Container>}
        </CardContent>
            
        </Card>
      </Box>
      </SideBar>
        
    ) 
}