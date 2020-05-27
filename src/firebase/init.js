// так как устанавливали через npm, то и достаем ее оттуда. Но папки там не нашел!!!
import firebase from 'firebase'

var firebaseConfig = {
	apiKey: "AIzaSyDinBDupMXTCBetB6HxW6Rwe8xOcojcsMI",
	authDomain: "ninga-smoothies-8c1e5.firebaseapp.com",
	databaseURL: "https://ninga-smoothies-8c1e5.firebaseio.com",
	projectId: "ninga-smoothies-8c1e5",
	storageBucket: "ninga-smoothies-8c1e5.appspot.com",
	messagingSenderId: "606976782199",
	appId: "1:606976782199:web:5610f629bad5f256867b72"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()