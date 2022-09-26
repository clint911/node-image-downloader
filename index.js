//this app downloads an image from unsplash by fetching image data and passing it to the writestream which parses it back to an image 
'use strict'

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');


async function downloadImage() {
  const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
  const path = path.resolve(__dirname, 'images', 'codeSample.jpg');
  const writer = Fs.createWriteStream(path);

  const response = await Axios({
    url,
    method: 'GET',
    resposeType: 'stream'
  })

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

downloadImage();

