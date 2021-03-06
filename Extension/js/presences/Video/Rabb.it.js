var playback = false,
videoTitle,
videoAuthor,
videoTimestamps,
playbackBoolean,
smallImageKey,
smallImageText,
urlForVideo,
lastURL = null

/**
 * Updates the Presence data and sends it back
 * to the background.js for further interaction
 */
async function updateData() {
  urlForVideo = document.location.href;
  
  if (urlForVideo != lastURL) {
    lastURL = urlForVideo;
    startTimeStamp = Math.floor(Date.now() / 1000);
  }
  
  //* If page has all required propertys
  if($('.roomName.on').get(0) != undefined) {

    videoTitle = $('.roomName.on')[0].innerHTML
    videoAuthor = $('.sessionsCount')[0].innerHTML.match("[0-9]*")[0] + " " + await getString("presence.watching")
    playbackBoolean = true

    var data = {
      clientID: '516742299355578380',
      presenceData: {
        details: $('<div/>').html(videoTitle).text(),
        state: $('<div/>').html(videoAuthor).text(),
        largeImageKey: 'rt_lg',
        largeImageText: chrome.runtime.getManifest().name + ' V' + chrome.runtime.getManifest().version,
        startTimestamp: startTimeStamp
      },
      trayTitle: $('<div/>').html(videoTitle).text(),
      playback: playbackBoolean,
      service: 'Rabb.it'
    }

  } else if(document.location.pathname == "/") {
    data = {
      clientID: '516742299355578380',
      presenceData: {
        details: await getString("presence.browsing"),
        largeImageKey: 'rt_lg',
        largeImageText: chrome.runtime.getManifest().name + ' V' + chrome.runtime.getManifest().version,
        startTimestamp: startTimeStamp
      },
      trayTitle: "",
      service: 'Rabbit',
      playback: true
    }
  }
  chrome.runtime.sendMessage({presence: data})
}