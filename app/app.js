/*angular.module('myApp', ['ui.bootstrap'])
    .config(function ($tooltipProvider) {
        $tooltipProvider.setTriggers({'myShow': 'myHide'});
        $tooltipProvider.options({appendToBody: true});
    });*/

angular.module('myApp', []);

angular.module('myApp')
    .controller('myCtrl', function ($scope) {
       $scope.hello = 'testing 555!';
    });





