import React from 'react';
import './App.css';
import {Login , Register, PasswordReset} from './modules/auth'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Application from './modules/Application/application';
import UserProvider from './providers/userProvider';


function App() {
  
  const user = null;

  return (
    <BrowserRouter>
      <UserProvider>
        <Application/>
      </UserProvider>
    </BrowserRouter>
  );

}

export default App;
