import React,{useState,useEffect} from 'react';
import clsx from 'clsx';
import { SideBar } from '../../components/index';
// import TutorialDataService from '../../services/allUsers.service';
import {allUserList} from '../../services/allUsers.service';
import {CssBaseline,Typography} from '@material-ui/core';
import {CircularProgress,Table ,TableBody ,TableCell,TableContainer ,TableHead ,TableRow, Paper,Grid} from '@material-ui/core';
import {useStyles} from './styles';
import {firestore} from '../../firebase';
import { DataGrid } from '@material-ui/data-grid';
const drawerWidth = 240;
const styles = theme => ({
    root: {
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
    }
    
  });


export default function AllUsers() {
  const classes = useStyles();
  const [allUserData, setAllUserData] = useState([]);
  const [loading,setLoading]=useState(true);

  const ref = firestore.collection("users");
  function getAllUsers() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAllUserData(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    { field: 'displayName', headerName: 'Full Name', width: 70 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'role', headerName: 'Role', width: 130 },
    
  
]

  return (
    <div >
        <SideBar>
        {loading ?<CircularProgress />:
        <Grid container justify={"center"} className={classes.content}>
        <Grid item xs={12} md={10} style={{ padding: "8px" }}>
          
        </Grid>
      </Grid>
      
      }
      </SideBar>
    </div>
    
  );
}
