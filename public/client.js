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

  var functions = ['image', 'analytics'];  //in the future this array should be populated by the filnenames of public/hashtags/filename.html
  socket.on('msg', function(data){
    var reg = /\#(\w*)/; //try to grab the second word after the hashtag for urls
    var hashtag = reg.exec(data['text']);
    if(hashtag && _.contains(functions, hashtag[0])) {
      $scope.templateUrl = hashtag[0].replace('#', '')+'.html'; //should use something like var reg = /\#(\w*)/
      console.log('templateUrl: '+$scope.templateUrl);
      //set template url to hashtag[0]
    }
    else {
      $scope.tweets.push(data);
    }
  });

  $scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
    });
});
