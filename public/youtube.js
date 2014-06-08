function onYouTubePlayerReady(playerId) {
  console.log('heresdsd');
      ytplayer = document.getElementById("myytplayer");
      ytplayer.playVideo();

      ytplayer.addEventListener('onStateChange', 'stateChangeCallback');
}

function stateChangeCallback(event){
  if(event === 0) {
    // show default
  }
}
