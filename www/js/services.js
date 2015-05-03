angular.module('starter.controllers')

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

                if (!sColors) {
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