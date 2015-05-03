angular.module('starter.controllers')
    .controller('FavoritesController', function ($scope, Favorites) {
    })

    .factory('Favorites', function () {
        return {
            set: function (favIndexes, cards) {
                console.debug('set favorites');

                console.log(favIndexes);
                var aFavoriteCards = [];

                for(var index in favIndexes){
                    console.log('cardIndex:', index);
                    aFavoriteCards.push(cards[index]);
                }
                console.log('aFavoriteCards', aFavoriteCards);
                return aFavoriteCards;
            }
        }
    })

