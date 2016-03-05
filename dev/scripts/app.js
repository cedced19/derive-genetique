angular.module('DeriveGenetique', ['ngRoute', 'chart.js'])
.config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: './views/index.html',
            controller: 'DeriveGenetiqueIndexCtrl'
        })
}])
.controller('DeriveGenetiqueIndexCtrl', ['$scope', function($scope) {
  var dice = function () {
    return Math.floor(Math.random() * 6) + 1;
  };
  var random = function (colors, cb) {
    var array = [];

    for(var i in colors) {
        var j = colors[i];
        if (i == 'red') {
          while (j) {
            array.push(1);
            j--;
          }
        } else if (i == 'green') {
          while (j) {
            array.push(2);
            j--;
          }
        } else if (i == 'blue') {
          while (j) {
            array.push(3);
            j--;
          }
        } else if (i == 'yellow') {
          while (j) {
            array.push(4);
            j--;
          }
        }
    }

    var result = [];

    while (result.length != 5) {
      var i = Math.floor(Math.random() * array.length);
      if (i in array) {
        result.push(array[i]);
        delete array[i];
      }
    }

    var object = {
      red: 0,
      green: 0,
      blue: 0,
      yellow: 0
    };

    for(var i in result) {
        var j = result[i];
        if (j == 1) {
          object.red++;
        } else if (j == 2) {
          object.green++;
        } else if (j == 3) {
          object.blue++;
        } else if (j == 4) {
          object.yellow++;
        }
    }

    if (colors.total) {
      object.total = colors.total;
    }

    if (cb) {
      cb(object);
    }
    return object;
  };

  var generate = function (colors) {
    var object = {
      red: 0,
      green: 0,
      blue: 0,
      yellow: 0
    };

    while (colors.red) {
      object.red = object.red + dice();
      colors.red--;
    };

    while (colors.green) {
      object.green = object.green + dice();
      colors.green--;
    };

    while (colors.blue) {
      object.blue = object.blue + dice();
      colors.blue--;
    };

    while (colors.yellow) {
      object.yellow = object.yellow + dice();
      colors.yellow--;
    };

    object.total = object.red + object.green + object.blue + object.yellow;

    return object;
  };

  var check = function (colors) {
    if (colors.red == colors.total || colors.green == colors.total || colors.blue == colors.total || colors.yellow == colors.total) {
      return false;
    }
    return true;
  };

  $scope.others = [];
  $scope.start = random({
    red: 8,
    green: 8,
    blue: 4,
    yellow: 4,
    total: 5
  }, function (start) {
    $scope.others.push(start);
    while ($scope.others.length != 11 && check($scope.others[$scope.others.length-1])) {
      $scope.others.push(generate(random($scope.others[$scope.others.length-1])));
    };
    $scope.others.shift();

    var red = [],
        green = [],
        blue = [],
        yellow = [];
    $scope.others.forEach(function (value) {
      red.push(Math.round(value.red/value.total*100));
      green.push(Math.round(value.green/value.total*100));
      blue.push(Math.round(value.blue/value.total*100));
      yellow.push(Math.round(value.yellow/value.total*100));
    });
    $scope.data = [];
    $scope.data.push(red, green, blue, yellow);

    $scope.labels = [];
    var n = $scope.others.length;
    while (n) {
      $scope.labels.push(($scope.others.length-n+1) + 'ème')
      n--;
    }
  });

  $scope.round = Math.round;

  $scope.series = ['Rouges', 'Verts', 'Bleus', 'Jaunes'];
}]);
