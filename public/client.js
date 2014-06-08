var tweetDashApp = angular.module('tweetDashApp', []);
console.log(tweetDashApp);

tweetDashApp.controller('TweetDashCtrl', function ($scope, socket) {
  var whichTemplate = 'default';

  console.log('angular ctrl');
  $scope.tweets = [];

  $scope.userName = userName;

  $scope.showTemplate = function(){
    return whichTemplate;
  }

  socket.on('service', function (data) {
    console.log('here');

    if (data === 'getUsername') {
      socket.emit('username', $scope.userName);
    }
  });

  var functions = ['#image', '#analytics', '#youtube'];  //in the future this array should be populated by the filnenames of public/hashtags/filename.html
  socket.on('msg', function(data){
    var reg = /\#\w*/; //try to grab the second word after the hashtag for urls
    var hashtag = reg.exec(data['text']);
    console.log('hashtag', hashtag);
    if(hashtag && _.contains(functions, hashtag[0])) {
      whichTemplate = hashtag[0].replace('#', ''); //should use something like var reg = /\#(\w*)/
      console.log('whichTemplate', whichTemplate);
      // whichTemplate = hashtag[0].replace('#', ''); //should use something like var reg = /\#(\w*)/
    }
    else {
      $scope.tweets.push(data);
    }
  });

  $scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
    });
});
