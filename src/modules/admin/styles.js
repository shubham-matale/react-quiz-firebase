import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
    
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  }));