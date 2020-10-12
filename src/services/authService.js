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
    
    loginUser(){
      
    },

    logout(){
      auth.signOut().then(function() {
        localStorage.clear()
        window.location.pathname="/"
      }, function(error) {
        // An error happened.
      });
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
            localStorage.setItem('userDetails',JSON.stringify({displayName,
              email,
              photoURL,
              role:"normalUser",
              ...additionalData}))
            window.location.pathname="/user/allQuizs";

          } catch (error) {
            console.error("Error creating user document", error);
          }
        }
        
      },

      getUserDetails(uid){
        firestore.collection('users').doc(uid).get().then(function(doc) {
          if (doc.exists) {
            let  userDocument = doc.data();
            userDocument = {uid, ...userDocument};
            console.log(userDocument)
            localStorage.setItem('userDetails',JSON.stringify(userDocument))
            if(userDocument.hasOwnProperty('role')&&userDocument['role']=='admin'){
              window.location.pathname="/admin/allQuiz"
            }else{
              window.location.pathname="/user/allQuizs"
            }
            
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
         
      }
      
}

export default AuthService;

