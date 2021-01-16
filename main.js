var gcloud = require('gcloud')({
    keyFilename: 'APIKey.json',
    projectID: 'childProof'
});

var vision = gcloud.vision();

var image = 'test1.jpg'

