import React from 'react';
import {Button,Box,makeStyles,Backdrop,CircularProgress} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';
import { Formik } from 'formik';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export default function SubmitForm(props) {
 

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleToggleBackDrop = () => {
        setOpen(!open);
      };
  const handleClose = () => {
    props.closeForm();
  };

  

  return (
    <div>
      <Dialog open={props.openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to submit quiz? If yes please fill the details below.
          </DialogContentText>
          <Formik 
            initialValues={{
              name: '',
              contactNumber: '',
              feedback : '',
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Quiz Name is required'),
              contactNumber: Yup.string().max(10).min(10).required('Phone Number Required'),
              feedback: Yup.string().required('End Time is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                props.setUserInfo(values);
                handleToggleBackDrop();
                handleClose();
                
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
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  
                />
                <TextField
                  error={Boolean(touched.contactNumber && errors.contactNumber)}
                  fullWidth
                  helperText={touched.contactNumber && errors.contactNumber}
                  label="Contact Number(9xxxxxxxxxx)"
                  margin="normal"
                  name="contactNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.contactNumber}
                  
                />
                <TextField
                  error={Boolean(touched.feedback && errors.feedback)}
                  fullWidth
                  helperText={touched.feedback && errors.feedback}
                  label="Feedback"
                  margin="normal"
                  name="feedback"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.feedback}
                  
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Submit Quiz
                  </Button>
                </Box>
                
              </form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}