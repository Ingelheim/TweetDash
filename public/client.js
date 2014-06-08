var tweetDashApp = angular.module('tweetDashApp', []);
console.log(tweetDashApp);

tweetDashApp.controller('TweetDashCtrl', function ($scope, socket) {

  console.log('angular ctrl');
  $scope.tweets = [];

  $scope.userName = userName;

  socket.on('service', function (data) {
    console.log('here');

    if (data === 'getUsername') {
      socket.emit('username', $scope.userName);
    }
  });

  socket.on('msg', function(data){
    $scope.tweets.push(data);
  });

  $scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
    });
});
