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
        
        <PrivateRoute path='/user/allQuizs' component={QuizList} exact/> 
        <PrivateRoute path='/user/playQuiz' component={QuizGame} exact/> 
        <PrivateRoute path='/admin' component={AdminHome} exact/>
        <Route path='/' component={Login} exact></Route>
        <PrivateRoute path='/admin/allQuiz' component={QuizHome} exact/>
        <PrivateRoute path='/admin/addQuiz' component={AddQuiz} exact/>
        <PrivateRoute path='/admin/quizDetails' component={QuizDetails} exact/>
        <PrivateRoute path='/admin/addNewQuestion' component={AddNewQuestion} exact/>
        <PrivateRoute path='/admin/allUser' component={ AllUsers } exact/>
        <Route path='/login' component={Login}  exact />
        <Route path='/register' component={Register} exact />  
        {/* <Route path='/resetPassword' component={PasswordReset} exact/>  */}
        
        
      </Switch>
  );

}

export default Application;
