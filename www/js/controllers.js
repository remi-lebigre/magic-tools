angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $ionicLoading, Database, Render) {

        $ionicLoading.show({
            template: 'loading'
        });

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/card.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeCard = function () {
            console.debug('closeCard');
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.showCard = function (index) {
            console.debug('showCard');

            console.log('index:', index);
            $scope.card = "";
            $scope.card = $scope.cards[index];
            console.log(' $scope.card:', $scope.card);
            $scope.modal.show();
        };

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


        var database = Database.get();
        database.then(function (success) {
                console.debug('cards sorted stored in scope.cards');
                $scope.totalCards = success.length;
                $scope.cards = success;
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

    })

    .service('Database', function ($http, $q) {

        var db = {};
        db.format = function (sets) {
            console.debug('Database setDataBase');

            var oSets = sets;
            if (!oSets) {
                console.error('oAllSets not yet initialized');
                return false;
            }
            var oCardsSorted = [];
            for (var set in oSets) {
                oCardsSorted.push.apply(oCardsSorted, oSets[set].cards);
            }
            var index = 0;
            oCardsSorted.forEach(function (i) {
                i.index = index;
                index++;
            });

            var iTotal = oCardsSorted.length;
            console.log('filled oCardsSorted. Total:' + iTotal);
            return oCardsSorted;
        };
        db.get = function () {
            console.debug('Database.fetchJson');

            var responsePromise = $http.get("allsets.json");
            var deferred = $q.defer();

            responsePromise.success(function (data, status, headers, config) {
                console.log('AJAX success');
                var oCardssorted = db.format(data);
                deferred.resolve(oCardssorted);
            });
            responsePromise.error(function (data, status, headers, config) {
                console.error("AJAX failed");
                deferred.reject('AJAX failed');
            });
            return deferred.promise;
        };
        return db;
    })

    .service('Render', function () {
        return {
            colors: function (sColors) {
                console.debug('Render colors');
                console.log('sColors:', sColors);

                if(!sColors){
                    return '<img src="img/pictos/0.png">';
                }
                var aManas = sColors.substring(1).substring(0, sColors.length - 2).split('}{');
                console.log('aManas:', aManas);

                var sFormatedColors = "";
                if (aManas) {
                    aManas.forEach(function (i) {
                        console.log('i:', i);
                        sFormatedColors += '<img src="img/pictos/' + i.toLowerCase() + '.png">';
                    });
                } else {
                    sFormatedColors += '<img src="img/pictos/0.png">';
                }
                console.log('sFormatedColors:', sFormatedColors);
                return sFormatedColors;
            }
        }
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    })



