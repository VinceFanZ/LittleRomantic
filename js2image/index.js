var Js2Image = require('js2image')
var path = require('path')
var source = path.join(__dirname, './jquery-3.3.1.js')
var image = path.join(__dirname, './a.png')
var out = source.replace('.js', '.xmas.js')

Js2Image.writeToFile(source, image, out, {
  reverse: false,
  size: {
    width: 70,
  },
}).then(function (code) {})
