import {firestore, auth} from '../firebase';

const AuthService = {

    getUserId(){
        return JSON.parse(localStorage.getItem('userDetails'))['uid'];     
    },
    getUserName(){
        return JSON.parse(localStorage.getItem('userDetails'))['displayName'];     
    },
    getUserProfilePic(){
        return JSON.parse(localStorage.getItem('userDetails'))['photoURL'];     
    },

    isUserAdmin(){
        return JSON.parse(localStorage.getItem('userDetails'))['role']=='admin';     
    },

    isLoggedIn(){
        if(localStorage.getItem('userDetails') && localStorage.getItem('userDetails').length>5){
            return true;
        }
        return false;
    },


     generateUserDocument (user, additionalData) {
        if (!user) return;
        const userRef = firestore.doc(`users/${user.uid}`);
        const snapshot =  userRef.get();
        if (!snapshot.exists) {
          const { email, displayName, photoURL } = user;
          try {
             userRef.set({
              displayName,
              email,
              photoURL,
              role:"normalUser",
              ...additionalData
            });
          } catch (error) {
            console.error("Error creating user document", error);
          }
        }
        let uid = user.uid;
        if (!uid) return null;
        try {
          const userDocument =  firestore.doc(`users/${uid}`).get();
          userDocument = {uid, ...userDocument};
          
          return userDocument;
        } catch (error) {
          console.error("Error fetching user", error);
        }
        
      }

     
      
      
}

export default AuthService;

