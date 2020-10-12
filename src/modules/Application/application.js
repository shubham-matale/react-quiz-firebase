import React , {useContext} from 'react';
import {Login , Register, PasswordReset} from '../auth';
import { AllQuiz , QuizList,QuizGame} from '../user';
import {AdminHome, AllUsers,AddQuiz,QuizHome,QuizDetails, AddNewQuestion} from '../admin';
import {UserContext } from '../../providers/userProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../privateRoute';


function Application() {
  
    const user = useContext(UserContext);

  return (

      
      <Switch>
        
        <Route path='/user/allQuizs' component={QuizList} exact/> 
        <Route path='/user/playQuiz' component={QuizGame} exact/> 
        <Route path='/admin' component={AdminHome} exact/>
        <Route path='/' component={Login} exact></Route>
        <Route path='/admin/allQuiz' component={QuizHome} exact/>
        <Route path='/admin/addQuiz' component={AddQuiz} exact/>
        <Route path='/admin/quizDetails' component={QuizDetails} exact/>
        <Route path='/admin/addNewQuestion' component={AddNewQuestion} exact/>
        <Route path='/admin/allUser' component={ AllUsers } exact/>
        <Route path='/login' component={Login}  exact />
        <Route path='/register' component={Register} exact />  
        <Route path='/resetPassword' component={PasswordReset} exact/> 
        
        
      </Switch>
  );

}

export default Application;
