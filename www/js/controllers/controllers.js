angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $ionicLoading, Database, Render, Favorites) {

        $scope.autosearchResult = function (e) {
            console.debug('autosearchResult');
            $scope.result=[];
            $scope.result.push(e.originalObject);
            console.log('result:',$scope.result);
            console.log(e);
        };
        //show loader
        $ionicLoading.show({
            template: 'loading'
        });

        //show card modal
        $ionicModal.fromTemplateUrl('templates/card.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // close card view
        $scope.closeCard = function () {
            console.debug('closeCard');
            $scope.modal.hide();
        };

        // show card view
        $scope.showCard = function (index) {
            console.debug('showCard');

            console.log('index:', index);
            $scope.card = "";
            $scope.card = $scope.cards[index];
            console.log(' $scope.card:', $scope.card);
            $scope.modal.show();
        };

        //key : index, values : .decks
        $scope.favoriteIndexes = angular.fromJson(window.localStorage.getItem('favorites')) || {};

        $scope.toggleFav = function (index) {
            console.debug('toggleFav');
            console.log('$scope.cards[index].isFav:', $scope.cards[index].isFav);
            $scope.cards[index].isFav ? $scope.removeFav(index) : $scope.addFav(index);
        };
        $scope.addFav = function (index) {
            console.debug('addFav');
            $scope.selectedIndex = index;
            console.log('$scope.selectedIndex:', $scope.selectedIndex);
            $scope.favoriteIndexes[index] = {};
            $scope.cards[index].isFav = true;
            $scope.favoriteCards = Favorites.set($scope.favoriteIndexes, $scope.cards);
            window.localStorage.setItem('favorites', angular.toJson($scope.favoriteIndexes));
        };
        $scope.removeFav = function (index) {
            console.warn('removeFav');
            $scope.selectedIndex = null;
            delete $scope.favoriteIndexes[index];
            $scope.cards[index].isFav = false;
            $scope.favoriteCards = Favorites.set($scope.favoriteIndexes, $scope.cards);
            window.localStorage.setItem('favorites', angular.toJson($scope.favoriteIndexes));
        };

        //search function
        $scope.findBy = function (oQuery) {
            console.debug('findby :', oQuery);

            if (oQuery['color']) {

                var i = 0;
                console.log('query is color:', oQuery['color']);
                $scope.result = [];
                for (var card in $scope.cards) {
                    if (i > 15) {
                        break;
                    }
                    var color = $scope.cards[card].colors;
                    console.log('color', color);

                    if (!color && oQuery['color'] == 'none') {
                        $scope.cards[card]._manaCost = Render.colors($scope.cards[card].manaCost);
                        $scope.result.push($scope.cards[card]);
                        i++;
                    } else if (color && color.indexOf(oQuery['color']) > -1) {
                        console.log('color found');
                        $scope.cards[card]._manaCost = Render.colors($scope.cards[card].manaCost);
                        $scope.result.push($scope.cards[card]);
                        i++;
                    }

                }
                $scope.totalCards = $scope.result.length;

            }

        };

        //initiliaze variables
        var database = Database.get();
        database.then(function (success) {
                console.debug('cards sorted stored in scope.cards');
                $scope.totalCards = success.length;
                $scope.cards = success;
                $scope.favoriteCards = Favorites.set($scope.favoriteIndexes, $scope.cards);

                //TODO REMOVE WHEN TESTS DONE
                cards = success;
                $ionicLoading.hide();
            },
            function (fail) {
                console.log('fail to find db', fail);
            });

        $scope.getRandCards = function (iNumber) {
            console.debug('getRandCards');
            if ($scope.cards) {
                $scope.result = [];
                console.debug('$scope.cards is set');
                for (var i = 0; i < iNumber; i++) {
                    var iTotalCards = $scope.cards.length;
                    var iRand = Math.floor((Math.random() * iTotalCards) + 1);
                    $scope.cards[iRand]._manaCost = Render.colors($scope.cards[iRand].manaCost);
                    $scope.result.push($scope.cards[iRand]);
                    $scope.totalCards = $scope.result.length;
                }
            }
        };

    });