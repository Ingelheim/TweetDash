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

  var functions = ['image', 'analytics', 'youtube'];  //in the future this array should be populated by the filnenames of public/hashtags/filename.html
  socket.on('msg', function(data){
    var reg = /\#(\w*)\s(\S*)/; //try to grab the second word after the hashtag for urls
    reg.exec(data['text']);
    console.log(data['text']);
    var hashtag = RegExp.$1;
    var url = RegExp.$2;
    console.log('test: '+hashtag+' '+url);
    if(hashtag && _.contains(functions, hashtag)) {
      console.log('I have a hashtag');
      whichTemplate = hashtag; //should use something like var reg = /\#(\w*)/
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
