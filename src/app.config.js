export default function Routes($urlRouterProvider, $stateProvider, $locationProvider) {
   "ngInject";

   // enable html5Mode for pushstate ('#'-less URLs)
   $locationProvider.html5Mode(true);
   $locationProvider.hashPrefix('!');


   $urlRouterProvider.otherwise('/');

   $stateProvider
   .state('main', {
      url: '/',
      template: require('./main/main.template.html'),
      controller: 'MainController',
      controllerAs: 'main'
   })
   .state('ask', {
      url: '/ask',
      template: require('./ask/ask.template.html'),
      controller: 'AskController',
      controllerAs: 'ask'
   });

}
