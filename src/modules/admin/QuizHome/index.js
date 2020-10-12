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
  Card, Checkbox, Table, TableBody,Button,  TableCell, Grid,  TableHead,  TablePagination,  TableRow,  Typography,Backdrop,CircularProgress,Paper} from '@material-ui/core';

  const width=57;
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
    overflowX:"auto"
  }
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
      <Container className={classes.nopad} maxWidth={false}>
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
          <Box minWidth={240} className={classes.tableResponsive}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Name
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    Start Time
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    End Time
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    No. of questions
                  </TableCell>
                  <TableCell className={classes.tableCell}>
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
                    <TableCell className={classes.tableCell} scope="row">
                      {Quiz.quizName}
                    </TableCell>
                    <TableCell className={classes.tableCell} >
                      {Quiz.startDate}
                    </TableCell >
                    
                    <TableCell className={classes.tableCell}>
                      {Quiz.endDate}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                     {Quiz.questionsCount}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
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
