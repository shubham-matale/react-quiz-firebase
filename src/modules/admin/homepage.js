import React from 'react';
import clsx from 'clsx';
import { SideBar } from '../../components/index';

import {CssBaseline,Typography, Switch} from '@material-ui/core';
import {useStyles} from './styles';
import { Route } from 'react-router-dom';
import AllUsers from './users';

const drawerWidth = 240;



export default function AdminHome() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar></SideBar>
      
    </div>
  );
}
