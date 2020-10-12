import React, { useState , useEffect } from 'react';
import {  Box,Container, makeStyles} from '@material-ui/core';
import {QuizService } from '../../../services';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import {firestore} from '../../../firebase';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SideBar from '../../../components/sidebar/sidebar';
import {
  Card, Checkbox, Table, TableBody,Button,  TableCell,  TableHead,  TablePagination,  TableRow,  Typography,Backdrop,CircularProgress} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const QuizHome = (props) => {

  localStorage.removeItem('selectedQuiz');

  const classes = useStyles();
  const [quizData,setQuizData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(true);
    const handleClose = () => {
      setOpen(false);
    };
  // console.log(quizData[0]['id'])
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onQuizDetailsClick = (quiz)=>{
    localStorage.setItem('selectedQuiz',JSON.stringify(quiz));
    props.history.push("/admin/quizDetails");
  }

  useEffect(() => {
    let allUserData = [];
    firestore.collection('quizes').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          allUserData.push({id:doc.id, ...doc.data()})
      });
      handleClose();
      setQuizData(allUserData);
    });
  });

  return (
    <SideBar>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
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
            props.history.push("/admin/addQuiz");
          }}
        >
          Add Quiz
        </Button>
      </Box>
      
    </div>
        <Box mt={3}>
        <Card  >
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Start Time
                  </TableCell>
                  <TableCell>
                    End Time
                  </TableCell>
                  <TableCell>
                    No. of questions
                  </TableCell>
                  <TableCell>
                    <Button>Details</Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizData.slice(0, limit).map((Quiz) => (
                  <TableRow
                    hover
                    key={Quiz.id}
                    
                  >
                    <TableCell>
                      {Quiz.quizName}
                    </TableCell>
                    <TableCell>
                      {Quiz.startDate}
                    </TableCell>
                    
                    <TableCell>
                      {Quiz.endDate}
                    </TableCell>
                    <TableCell>
                     {Quiz.questionsCount}
                    </TableCell>
                    <TableCell>
                      <Button color='primary' onClick={()=>{
                        onQuizDetailsClick(Quiz)
                      }}>
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={quizData.length}
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
  );
};

export default QuizHome;
