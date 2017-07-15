(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SoundDrop = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});