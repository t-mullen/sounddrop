# sounddrop

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Fetch any SoundCloud url.

NPM module packaging of (diracdelta's demo)[https://github.com/diracdeltas/SoundDrop]. Full credit goes to them.

> sounds are cool please give money to artists

## install

`npm install --save sounddrop`

A standalone Browserify build is available in the dist folder.


## Usage

```javascript

var drop = new SoundDrop({
  clientID: 'xxxxxxxxxxxxxx' // See https://auth0.com/docs/connections/social/soundcloud
})

drop.fetch('https://soundcloud.com/diracdeltas/pu3elibqww9b', function (streamURL, artist) {
  // streamURL is the direct URL of the mp3 file
  // artist is the name of the artist you should support :)
})
```

