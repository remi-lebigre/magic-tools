angular.module('starter', ['ionic', 'starter.controllers',"angucomplete-alt"])

    .run(function ($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search.html"
                    }
                }
            })

            .state('app.game', {
                url: "/game",
                views: {
                    'menuContent': {
                        templateUrl: "templates/game.html"
                    }
                }
            })

            .state('app.builder', {
                url: "/builder",
                views: {
                    'menuContent': {
                        templateUrl: "templates/builder.html",
                        controller: 'BuilderController'
                    }
                }
            })

            .state('app.build', {
                url: "/builder/{buildId}",
                views: {
                    'menuContent': {
                        templateUrl: "templates/build.html",
                        controller: 'BuildsController'
                    }
                }
            })

            .state('app.favorites', {
                url: "/favorites",
                views: {
                    'menuContent': {
                        templateUrl: "templates/favorites.html",
                        controller: 'FavoritesController'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/search');
    });
