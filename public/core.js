var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope, socket) {

  // on init: send username to socket
  // 
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
