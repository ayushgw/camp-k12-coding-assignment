import firebase from 'firebase';

// Initialize Firebase
var config = {
   apiKey: "AIzaSyBVStbSMdSQabhlGQbxRJ5S1n0tMGOzJkg",
   authDomain: "waylo-coding-challenge.firebaseapp.com",
   databaseURL: "https://waylo-coding-challenge.firebaseio.com",
   projectId: "waylo-coding-challenge",
   storageBucket: "waylo-coding-challenge.appspot.com",
   messagingSenderId: "358369695785"
};
firebase.initializeApp(config);


export default function AuthService(DatabaseService, $q) {
   "ngInject";
   var service = this;

   var firebaseauth = firebase.auth();

   service.isAuthenticated = function() {
      var deferred = $q.defer();
      let flag = false;
      firebaseauth.onAuthStateChanged(function(user) {
         if (user) {
            flag = true;
            return deferred.resolve(flag);
         } else {
            return deferred.reject(flag);
         }
      });
      return deferred.promise;
   };

   service.oauthSignIn = (provider) => {
      let Provider = provider + 'AuthProvider';
      let ProviderObj = new firebase.auth[Provider]();
      let oauth = firebaseauth.signInWithPopup(ProviderObj);
      oauth.then( (result) => {
         DatabaseService.saveUserDetails(result.additionalUserInfo.profile, result.user);
         return result;
      })
      .catch( (error) => {
         return error;
      });
      return oauth;
   };

   service.userLogin = (user) => {
      return firebaseauth.signInWithEmailAndPassword(user.email, user.password);
   };

   service.userSignup = (user) => {
      let signup = firebaseauth.createUserWithEmailAndPassword(user.email, user.password);
      signup.then( (result) => {
         DatabaseService.saveUserDetails(user, result);
         return result;
      });
      return signup;
   };

   service.userSignOut = () => {
      firebaseauth.signOut();
   };
}
