import {firestore} from '../firebase';



export const allUserList = () =>{
  let allUserData = [];
  firestore.collection('users').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        allUserData.push(doc.data())
    });
    return allUserData;
  });
}

// class TutorialDataService {
//     getAll() {
//        db.get().then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             console.log("doc.id,  doc.data()");
//         });
//       });
//   }
  
//     create(tutorial) {
//       return db.add(tutorial);
//     }
  
//     update(id, value) {
//       return db.doc(id).update(value);
//     }
  
//     delete(id) {
//       return db.doc(id).delete();
//     }
//   }
  
//   export default new TutorialDataService();
