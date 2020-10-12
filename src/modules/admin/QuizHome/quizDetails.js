import React, {useState, useEffect} from 'react';
import {
    Box, Card, Button, Container, Grid,Link,TextField,
     makeStyles,MenuItem ,   Table, TableBody,  TableCell,  TableHead,  TablePagination,  TableRow,  Typography, CardHeader
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
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import {firestore} from '../../../firebase';
import PerfectScrollbar from 'react-perfect-scrollbar';





export default function QuizDetails(props){
    

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    // console.log(quizData[0]['id'])
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
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
          props.history.push('/admin/addNewQuestion')
        }
        catch(error){
          
        }
    
      };
    
    return (
        <SideBar>
        <Container maxWidth={false}>
        <div>
        <Box
          display="flex"
          justifyContent="flex-end"
          
        >
          
          <Button
            color="primary"
            variant="contained"
            onClick={()=>{
              props.history.push("/admin/addNewQuestion");
            }}
          >
            Add Question
          </Button>
          
        </Box>
        
      </div>
          <Box mt={3}>
              <Card>
                  <CardHeader
                  subheader={"Start Date : "+selectedQuiz.startDate+" | End Date "+selectedQuiz.endDate}
                  title={"Quiz Name : "+selectedQuiz.quizName}
                  />
              </Card>
          <Card  >
          <PerfectScrollbar>
            <Box minWidth={1050}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Question
                    </TableCell>
                    <TableCell>
                      Option A
                    </TableCell>
                    <TableCell>
                      Option B
                    </TableCell>
                    <TableCell>
                      Option C
                    </TableCell>
                    <TableCell>
                      Option D
                    </TableCell>
                    <TableCell>
                      Correct Ans
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedQuiz?.questions?selectedQuiz.questions.slice(0, limit).map((Quiz) => (
                    <TableRow
                      hover
                      key={Quiz.question}
                      
                    >
                      <TableCell>
                        {Quiz.question}
                      </TableCell>
                      <TableCell>
                        {Quiz.optionA}
                      </TableCell>
                      
                      <TableCell>
                        {Quiz.optionB}
                      </TableCell>
                      <TableCell>
                       {Quiz.optionC}
                      </TableCell>
                      <TableCell>
                       {Quiz.optionD}
                      </TableCell>
                      <TableCell>
                        {Quiz.correctAns}
                      </TableCell>
                    </TableRow>
                  )):''}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={selectedQuiz?.questions?selectedQuiz.questions.length:0}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
          </Box>
        </Container>
      </SideBar>
        
    ) 
}