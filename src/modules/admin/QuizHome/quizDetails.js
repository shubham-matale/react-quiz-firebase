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

const  width = 57;
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },  root: {
    display: 'flex',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'hide',
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  },
  nopad:{
    [theme.breakpoints.up("xs")]: {
      paddingLeft:0
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft:0
    },
  },
  tableResponsive:{
    [theme.breakpoints.up("xs")]: {
      maxWidth:`calc(100% - ${width}px)`
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth:`calc(100% - ${width}px)`
    },
    overflowX:"auto"
  }

}));



export default function QuizDetails(props){
    
  const classes = useStyles();
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
            <Box minWidth={240} className={classes.tableResponsive}>
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
          {selectedQuiz?.result?
          <Box mt={3}>
          <Card>
              <CardHeader
              title="Quiz Results"
              />
          </Card>
      <Card  >
      <PerfectScrollbar>
        <Box minWidth={240} className={classes.tableResponsive}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Score
                </TableCell>
                <TableCell>
                  Contact Number
                </TableCell>
                <TableCell>
                  Feedback
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedQuiz?.result?selectedQuiz.result.slice(0, limit).map((Quiz) => (
                <TableRow
                  hover
                  key={Quiz.name}
                  
                >
                  <TableCell>
                    {Quiz.name}
                  </TableCell>
                  <TableCell>
                    {Quiz.score}
                  </TableCell>
                  
                  <TableCell>
                    {Quiz.contactNumber}
                  </TableCell>
                  <TableCell>
                   {Quiz.feedback}
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
      :''}
        </Container>
      </SideBar>
        
    ) 
}