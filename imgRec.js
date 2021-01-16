const express = require('express');
const app = expess();

app.listen(5000, '127.0.01', ()=>console.log('Server running'));

/*
// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

const bucketName = 'Bucket where the file resides, e.g. my-bucket';

//Include image here
const imgPath = 'path/to/image.png';

// Performs safe search property detection on the remote file
const [result] = await client.safeSearchDetection(
  `gs://${bucketName}/${imgPath}`
);
const detections = result.safeSearchAnnotation;
console.log(`Adult: ${detections.adult}`);
console.log(`Medical: ${detections.medical}`);
console.log(`Violence: ${detections.violence}`);

app.listen(5000, '127.0.01', ()=>console.log('Server running'));
*/