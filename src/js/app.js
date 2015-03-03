'use strict';

var modules = [
  'ui.router',
  'mm.foundation',
  'ngAnimate',
  'LocalStorageModule',
  'ngLodash'
];

var bwsClientApp = angular.module('bwsClientApp', modules);

bwsClientApp.config(
  function (localStorageServiceProvider, $stateProvider, $urlRouterProvider) {
    localStorageServiceProvider
      .setPrefix('bwsClientApp')
      .setStorageType('localStorage')
      .setNotify(true, true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('signin', {
        url: '/',
        controller: 'signinController',
        templateUrl: 'views/signin.html',
        authenticate: false
      })
      .state('home', {
        url: '/home',
        controller: 'homeController',
        templateUrl: 'views/home.html',
        authenticate: true
      })
      .state('receive', {
        url: '/receive',
        controller: 'receiveController',
        templateUrl: 'views/receive.html',
        authenticate: true
      })
      .state('send', {
        url: '/send',
        controller: 'sendController',
        templateUrl: 'views/send.html',
        authenticate: true
      })
      .state('history', {
        url: '/history',
        controller: 'historyController',
        templateUrl: 'views/history.html',
        authenticate: true
      })
      .state('profile', {
        url: '/profile',
        controller: 'profileController',
        templateUrl: 'views/profile.html',
        authenticate: true
      })
      .state('create', {
        url: '/create',
        controller: 'createController',
        templateUrl: 'views/create.html',
        authenticate: true
      })
      .state('join', {
        url: '/join',
        controller: 'joinController',
        templateUrl: 'views/join.html',
        authenticate: true
      })
      .state('signup', {
        url: '/signup',
        controller: 'signupController',
        templateUrl: 'views/signup.html',
        authenticate: false
      })
      .state('signout', {
        url: '/signout',
        controller: 'signoutController',
        authenticate: true
      });
  })
  .run(function ($rootScope, $state, $interval, identityService, walletService) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !identityService.isAuthenticated()){
        $state.transitionTo('signin');
        event.preventDefault(); 
      }
      else {
        if (!toState.authenticate && identityService.isAuthenticated()) {
          $state.transitionTo('home');
          event.preventDefault(); 
        }
      }
    });
  });

