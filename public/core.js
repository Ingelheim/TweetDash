var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope, socket) {

  $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];

  socket.on('init', function (data) {
    // $scope.name = data.name;
    // $scope.users = data.users;
  });

  socket.on('send:message', function (message) {
    // $scope.messages.push(message);
    // socket.emit
  });

  $scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
        // or something like
        // socket.removeListener(this);
    });
});
