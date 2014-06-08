var tweetDashApp = angular.module('tweetDashApp', []);
console.log(tweetDashApp);

var whichTemplate = 'default';
tweetDashApp.controller('TweetDashCtrl', function ($scope, socket, $window) {

  console.log('angular ctrl');
  $scope.tweets = [];
  $scope.url = '';

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

  var functions = ['image', 'analytics'];  //in the future this array should be populated by the filnenames of public/hashtags/filename.html
  socket.on('msg', function(data){
    var reg = /\#(\w*)\s(\S*)/; //try to grab the second word after the hashtag for urls
    reg.exec(data['text']);
    console.log(data['text']);
    var hashtag = RegExp.$1;
    var url = RegExp.$2;
    console.log('test: '+hashtag+' '+url);
    $scope.showYoutube = false;

    if (hashtag) {
      $scope.showYoutube = hashtag === 'youtube';
    }

    if(hashtag && _.contains(functions, hashtag)) {
      console.log('I have a hashtag');
      whichTemplate = hashtag; //should use something like var reg = /\#(\w*)/
      $scope.url = url;
      // whichTemplate = hashtag[0].replace('#', ''); //should use something like var reg = /\#(\w*)/
    }
    else {
      if(!$scope.showYoutube) {
        $scope.tweets.push(data);
      }

    }

    console.log($scope.showYoutube);
  });

  $scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
    });
});
