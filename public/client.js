var tweetDashApp = angular.module('tweetDashApp', []);
console.log(tweetDashApp);

var whichTemplate = 'default';
tweetDashApp.controller('TweetDashCtrl', function ($scope, socket, $window) {

  console.log('angular ctrl');
  $scope.tweets = [];

  $scope.userName = userName;

  $scope.showYoutube = false;

  $scope.showTemplate = function(){
    return whichTemplate;
  }

  socket.on('service', function (data) {
    console.log('here');

    if (data === 'getUsername') {
      socket.emit('username', $scope.userName);
    }
  });

  var functions = ['#image', '#analytics'];  //in the future this array should be populated by the filnenames of public/hashtags/filename.html
  socket.on('msg', function(data){
    var reg = /\#\w*/; //try to grab the second word after the hashtag for urls
    var hashtag = reg.exec(data['text']);
    console.log('hashtag', hashtag);

    if (hashtag) {
      $scope.showYoutube = hashtag[0] === '#youtube';
    }

    if(hashtag && _.contains(functions, hashtag[0])) {
      whichTemplate = hashtag[0].replace('#', ''); //should use something like var reg = /\#(\w*)/
      console.log('whichTemplate', whichTemplate);
    }
    else {
      $scope.tweets.push(data);
    }

    console.log($scope.showYoutube);
  });

  $scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
    });
});
