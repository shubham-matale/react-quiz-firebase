import { auth, firestore } from '../firebase';
import AuthService from './authService';

const QuizService = {

    createNewQuiz(name, startDate, endDate) {
        let newQuiz = {
            quizName: name,
            startDate: startDate,
            endDate: endDate,
            createdBy: AuthService.getUserId(),
            questionsCount: 0
        }


        console.log(newQuiz);

        try {
            firestore.collection('quizes').doc().set(newQuiz);
            
        } catch (error) {
            alert('Something went wrong. Reload Page');
            
        }

    },

    getAllQuiz() {
        console.log('getting')
        let allUserData = [];
        firestore.collection('quizes').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                allUserData.push({ id: doc.id, ...doc.data() })
            });
            console.log(allUserData, '###')
            return allUserData;
        });

    },
    addQuizQuestion() {

    },

    updateQuizDetails() {
        let data=JSON.parse(localStorage.getItem('selectedQuiz'));
        
        try {
            firestore.collection('quizes').doc(data['id']).update(data);
        } catch (error) {
            alert('Something went wrong. Reload Page');
        }
    }

}

export default QuizService;