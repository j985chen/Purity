var settings = {
	"filterMethod": 1,
	"censorCharacter": "*",
	"filterToggle": true,
	"matchMethod": 0,
	"password": "null",
};

//-------much simpler script to replace words --------// 

var elements = document.getElementsByTagName('*');
//document interface that returns HTMLCollection of elements with given tag name 
// * represents all elements 

var sourceWordsToTargetWords = [
	[['anal'], 'butt'],
	[['ass-hat'], 'butt-hat'],
	[['assbag'], 'buttbag'],
	[['assbite'], 'buttbite'],
	[['asscock'], 'buttcrook'],
	[['asses'], 'butts'],
	[['assfuck'], 'buttmate'],
	[['asshead'], 'butthead'],
	[['asshole'], 'butthole'],
	[['asslick'], 'buttlick'],
	[['asslicker'], 'buttlicker'],
	[['asslicker'], 'buttlicker'],
	[['assmonkey'], 'buttmonkey'],
	[['assmunch'], 'buttmunch'],
	[['assshit'], 'butard'],
	[['asssucker'], 'buttsucker'],
	[['bastard'], 'no father'],
	[['bitch'], 'b****'],
	[['bitchass'], 'b****a**'],
	[['bitchy'], 'rude'],
	[['blowjob'], '*******'],
	[['bullshit'], 'bull crap'],
	[['clitface'], 'face'],
	[['clusterfuck'], 'mess'],
	[['cock'], 'rooster'],
	[['cockass'], 'nonsense'],
	[['cockbite'], 'c***bite'],
	[['cockburger'], 'c***burger'],
	[['cockface'], 'c***face'],
	[['cockhead'], 'c***head'],
	[['cockmonkey'], 'monkey'],
	[['cocknose'], 'c***nose'],
	[['cocknugget'], 'chicken nugget'],
	[['cockshit'], 'c***s***'],
	[['cockwaffle'], 'waffle'],
	[['creampie'], 'food'],
	[['cum'], 'c**'],
	[['cumbubble'], 'c**bubble'],
	[['cumdumpster'], 'c**dumpster'],
	[['cumslut'], 'c**s***'],
	[['cumtart'], 'c**tart'],
	[['cunt'], 'c***'],
	[['cuntass'], 'irritating'],
	[['cuntface'], 'irritating'],
	[['cuntrag'], 'irritating'],
	[['cuntslut'], 'annoying'],
	[['damn'], 'dang'],
	[['dammit'], 'dang it'],
	[['deepthroat'], 'throat'],
	[['dick'], 'd***'],
	[['dickbag'], 'd***bag'],
	[['dickface'], 'd***face'],
	[['dickfuck'], 'd***f***'],
	[['dickfucker'], 'd***f*****'],
	[['dickhead'], 'd***head'],
	[['dickjuice'], 'juice'],
	[['dickmilk'], 'milk'],
	[['dicksucker'], 'd***sucker'],
	[['dickwad'], 'mean'],
	[['dickweasel'], 'mean'],
	[['dickweed'], 'mean'],
	[['dickwod'], 'rude'],
	[['dildo'], 'toy'],
	[['dildos'], 'toys'],
	[['dipshit'], 'loser'],
	[['doochbag'], 'duck'],
	[['douche'], 'duck'],
	[['douchebag'], 'duck'],
	[['douchefag'], 'duck'],
	[['dumbass'], 'dummy'],
	[['dumb ass'], 'dummy'],
	[['dumass'], 'dummy'],
	[['dumbfuck'], 'dummy'],
	[['dumbshit'], 'dummy'],
	[['dumshit'], 'dummy'],
	[['fag'], 'loser'],
	[['faggot'], 'loser'],
	[['fagfucker'], 'frick'],
	[['fuck'], 'frick'],
	[['fuckable'], 'frickable'],
	[['fucking'], 'freaking'],
	[['fucked'], 'fricked'],
	[['fuckass'], 'frick'],
	[['fucker'], 'fricker'],
	[['fuckers'], 'frickers'],
	[['fuckin'], 'freakin'],
	[['handjob'], 'h******'],
	[['jizz'], 'j***'],
	[['motherfucker'], 'motherfricker'],
	[['orgy'], 'group'],
	[['piss'], 'pee'],
	[['pissed'], 'mad'],
	[['pissing'], 'urinating'],
	[['shit'], 's***'],
	[['shite'], 's***'],
	[['shitting'], 'pooping'],
	[['shite'], 'poop'],
	[['thefuck'], 'the heck'],
	[['whore'], 'w****'],
	[['whores'], 'w*****'],
	[['slut'], 's***'],
	[['slutty'], 's*****'],
	[['hoe'], 'h**'],
	[['ho'], 'h*'],
	[['ballots'], 'votes'],
	[['ballot'], 'vote'],
	[['discord'], 'disagreement'],
	[['statehouse'], 'government building'],
	[['additional'], 'more'],
	[['bracing'], 'getting ready for'],
	[['confrontation'], 'fight'],
	[['object to'], 'disagree with'],
	[['object'], 'disagree'],
	[['perpetuating'], 'maintaining'],
	[['perpetuate'], 'maintain'],
	[['gearing up'], 'getting ready'],
	[['nation'], 'country'],
	[['domestic extremists'], 'terrorists'],
	[['domestic extremist'], 'terrorist'],
	[['prior to'], 'before'],
	[['amend'], 'change'],
	[['federal'], 'government'],
	[['reprehensible'], 'wrong'],
	[['numerous'], 'a lot'],
	[['received'], 'gotten'],
	[['receive'], 'get'],
	[['legitimize'], 'confirm'],
	[['unsupported'], 'wrong'],
	[['attended'], 'went to'],
	[['attend'], 'go to'],
	[['falsehoods'], 'lies'],
	[['falsehood'], 'lie'],
	[['integrity'], 'quality'],
	[['law enforcement'], 'police'],
	[['pussy'], 'cat'],
	

]; //search for these words 

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
}; //RegExp is used for finding patterns 

function identity(string) {
    return string;
}; //returns input unchanged 

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}; //returns string with first letter capitalized 

function toUpperCase(string) {
    return string.toUpperCase();
}; //returns all caps version of string

function makeRegexToTargetWords(sourceWordsToTargetWords, modifyWords) {
    return sourceWordsToTargetWords.map(function(sourceAndTarget) {
        var [source,target] = sourceAndTarget;
        source = source.map(modifyWords);
        target = modifyWords(target);
        return [makeRegex(source), target];
    });
};

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
	

var sourceRegexToTargetWords = makeRegexToTargetWords(sourceWordsToTargetWords, identity).concat(makeRegexToTargetWords(sourceWordsToTargetWords, capitalizeFirstLetter)).concat(makeRegexToTargetWords(sourceWordsToTargetWords, toUpperCase));

function replaceTextWithRegexes(text, sourceRegexToTargetWords) {
    for (var k = 0; k < sourceRegexToTargetWords.length; k++) {
        var [regex, targetWord] = sourceRegexToTargetWords[k];
        var replacedText = text.replace(regex, targetWord);
        text = replacedText
    }
    return text;
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            replacedText = replaceTextWithRegexes(text, sourceRegexToTargetWords);

            if (replacedText !== text) {
                console.log('replaced');
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}