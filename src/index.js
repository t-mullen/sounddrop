var INFO_BASE_URL = 'https://api.soundcloud.com/resolve.json'
var TRACK_BASE_URL = 'https://api.soundcloud.com/tracks'

function SoundDrop (opts) {
  var self = this
  if (!(self instanceof SoundDrop)) return new SoundDrop(opts)

  opts = opts || {}
  if (!opts.clientID) {
    throw new Error('Must specify a client ID. See https://auth0.com/docs/connections/social/soundcloud')
  }
  if (!window || !window.fetch) {
    throw new Error('Your browser does not support the Fetch API.')
  }
  self._clientID = opts.clientID
}

SoundDrop.prototype._getInfoURL = function (url) {
  var self = this

  return `${INFO_BASE_URL}?url=${encodeURIComponent(url)}&client_id=${self._clientID}`
}

SoundDrop.prototype._getStreamUrl = function (trackId) {
  var self = this

  return `${TRACK_BASE_URL}/${trackId}/stream?client_id=${self._clientID}`
}

SoundDrop.prototype.fetch = function (url, cb) {
  var self = this

  if (!url || !url.startsWith('https://') || !url.includes('soundcloud.com')) {
    throw new Error('Please enter a valid HTTPS SoundCloud URL.')
  }

  window.fetch(self._getInfoURL(url)).then(function (response) {
    if (!response.url) throw new Error('Oops, we could\'t get a track from that URL.')

    var trackIdMatch = response.url.match(/\/tracks\/(\d+?).json/)
    var trackId = trackIdMatch && trackIdMatch[1]
    if (trackId) {
      var streamUrl = self._getStreamUrl(trackId)
      var artist = url.split('/')[3]
      cb(streamUrl, artist)
    }
  })
}

module.exports = SoundDrop
