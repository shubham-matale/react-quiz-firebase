import React, {useState, useEffect} from 'react';
import {
    Box, Card, CardContent, Divider,CardHeader,CardFooter,CircularProgress, Button, Container, Grid,Link,TextField,
    Typography, makeStyles,MenuItem 
  } from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SideBar from '../../../components/sidebar/sidebar';
import {QuizService} from '../../../services';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



export default function AddNewQuestion(props){
    const [value, setValue] = React.useState('optionA');

    const handleChangeRadio = (event) => {
        setValue(event.target.value);
    };
    const [loader,setLoader] = useState(false);
    const [selectedQuiz, setSelectedQuiz]=useState({});
    useEffect(() => {
        const localRepoItems = localStorage.getItem('selectedQuiz');
    
        if (localRepoItems) {
            setSelectedQuiz(JSON.parse(localRepoItems));
        }
    
      }, []);
    


    
      const addQuestion =  (questionData) => {
        
        try{
          let currentQuizDetails = selectedQuiz;
          if(currentQuizDetails.hasOwnProperty('questions')){
              currentQuizDetails['questions'].push(questionData)
          }else{
            currentQuizDetails['questions']=[];
            currentQuizDetails['questions'].push(questionData)
          }
          currentQuizDetails['questionsCount']=currentQuizDetails['questions'].length;
          localStorage.setItem('selectedQuiz',JSON.stringify(currentQuizDetails));
          setSelectedQuiz(currentQuizDetails);
          QuizService.updateQuizDetails();
          props.history.push('/admin/quizDetails')
        }
        catch(error){
          
        }
    
      };
    
    return (
        <SideBar>
            <Grid md={12}>

            
            <Box
        display="flex"
        flexDirection="row"
        height="100%"
        justifyContent="start"
      ><Card>
      <CardHeader
        subheader="Add Quiz Qustions"
        title="New Question"
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
              question:'',
              optionA:'',
              optionB:'',
              optionC:'',
              optionD:'',
              correctAns:'optionA',
            }}
            validationSchema={Yup.object().shape({
                question: Yup.string().max(500).required('Question is required'),
                optionA:Yup.string().max(255).required('Option A is required'),
                optionB:Yup.string().max(255).required('Option B is required'),
                optionC:Yup.string().max(255).required('Option C is required'),
                optionD:Yup.string().max(255).required('Option D is required'),
                
            })}
            onSubmit={(values, { setSubmitting }) => {
                values.correctAns=values[value];
                addQuestion(values);
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
                  error={Boolean(touched.question && errors.question)}
                  fullWidth
                  helperText={touched.question && errors.question}
                  label="Question"
                  margin="normal"
                  name="question"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.question}
                  
                />
                <TextField
                  error={Boolean(touched.optionA && errors.optionA)}
                  fullWidth
                  helperText={touched.optionA && errors.optionA}
                  label="Option A"
                  margin="normal"
                  name="optionA"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.optionA}
                  
                />
                <TextField
                  error={Boolean(touched.optionB && errors.optionB)}
                  fullWidth
                  helperText={touched.optionB && errors.optionB}
                  label="Option B"
                  margin="normal"
                  name="optionB"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.optionB}
                  
                />
                <TextField
                  error={Boolean(touched.optionC && errors.optionC)}
                  fullWidth
                  helperText={touched.optionC && errors.optionC}
                  label="Option C"
                  margin="normal"
                  name="optionC"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.optionC}
                  
                />
                <TextField
                  error={Boolean(touched.optionD && errors.optionD)}
                  fullWidth
                  helperText={touched.optionD && errors.optionD}
                  label="Option D"
                  margin="normal"
                  name="optionD"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.optionD}
                  
                />
                <FormControl component="fieldset">
                <FormLabel component="legend">Options</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangeRadio}>
                      <FormControlLabel value="optionA" control={<Radio />} label="Oprion A" />
                      <FormControlLabel value="optionB" control={<Radio />} label="Oprion B" />
                      <FormControlLabel value="optionC" control={<Radio />} label="Oprion C" />
                      <FormControlLabel value="optionD" control={<Radio />} label="Oprion D" />
                  </RadioGroup>
                </FormControl>
                
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add Quiz Qustions
                  </Button>
                </Box>
                
              </form>
            )}
          </Formik>
        </Container>}
        </CardContent>
            
        </Card>
      </Box>
      </Grid>
            <Grid md={6}>
                
            </Grid>
      </SideBar>
        
    ) 
}