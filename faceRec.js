/*const cherio = require('cherio');
const request = require('request');
const fs = require('fs');

// Create a Write Stream 
var WriteStream  = fs.createWriteStream("ImagesLink.txt", "UTF-8");

request('https://www.bridgeport.edu/', (err, resp, html)=>{

    if(!err && resp.statusCode == 200){
        console.log("Request was success ");
        
        // Define Cherio or $ Object 
        const $ = cherio.load(html);

        $("img").each((index, image)=>{

            var img = $(image).attr('src');
            var baseUrl = 'https://www.bridgeport.edu/';
            var Links = baseUrl + img;
            WriteStream.write(Links);
            WriteStream.write("\n");
        });

    }else{
        console.log("Request Failed ");
    }

});*/

var images = [];
for(var i = 0; i < document.images.length; i++){
  images.push(document.images[i].src);
}
chrome.runtime.sendMessage({method:"downloadImages",images:images});

'use strict';
async function detectSafeSearch(fileName) {
// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();
const projectId = "childproof-301905";
const keyFilename = "APIKey.json";


const imgName = 'test1.jpeg';

for(let num = 0; num<images.length; num++){
    imgName = images[num];
}

// Performs safe search property detection on the remote file
const [result] = await client.safeSearchDetection(imgName);
const detections = result.safeSearchAnnotation;
console.log('Safe search:');
console.log(`Adult: ${detections.adult}`);
console.log(`Medical: ${detections.medical}`);
console.log(`Spoof: ${detections.spoof}`);
console.log(`Violence: ${detections.violence}`);
console.log(`Racy: ${detections.racy}`);
}

