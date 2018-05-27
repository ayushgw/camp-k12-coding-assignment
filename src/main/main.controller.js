import logo from '../Data/images/logo.png';

export default function MainController(AuthService, $state, $scope, $timeout) {
   "ngInject";
   var main = this;

   main.logo = logo;

   main.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   main.isLoading = false;
   let toggleLoadingFlag = () => {
      main.isLoading = !main.isLoading;
   };

   let showOauthErrorMessage = () => {
      main.oauthErrorMessage = true;
      $timeout( () => {
         main.oauthErrorMessage = false;
      }, 2300);
   };

   main.oauthSignIn = (provider) => {
      toggleLoadingFlag();
      let oauthlogin = AuthService.oauthSignIn(provider);
      oauthlogin.then(function(result) {
         toggleLoadingFlag();
         $state.go('home');
      })
      .catch(function(error) {
         toggleLoadingFlag();
         showOauthErrorMessage();
         $scope.$digest();
      });
   };

   main.userLogin = (user) => {
      toggleLoadingFlag();
      let userlogin = AuthService.userLogin(user)
      userlogin.then(function(result) {
         toggleLoadingFlag();
         $state.go('home');
      })
      .catch(function(error) {
         toggleLoadingFlag();
         console.log(error);
      });
   };

   main.userSignup = (user) => {
      toggleLoadingFlag();
      let userSignup = AuthService.userSignup(user)
      userSignup.then(function(result) {
         toggleLoadingFlag();
         $state.go('home');
      })
      .catch(function(error) {
         toggleLoadingFlag();
         console.log(error);
      });
   };
}
