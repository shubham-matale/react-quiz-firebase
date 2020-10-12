import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";
import {AuthService} from '../services'
export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = async () => {
   
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;