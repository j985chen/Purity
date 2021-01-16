chrome.runtime.onInstalled.addListener(function(details) {
    var init_settings = {
        words: [
            { "word": "ass", "count": 0 },
            { "word": "bastard", "count": 0},
            { "word": "bitch", "count": 0 },
            { "word": "cock", "count": 0 },
            { "word": "crap", "count": 0 },
            { "word": "cum", "count": 0 },
            { "word": "cunt", "count": 0 },
            { "word": "damn", "count": 0 },
            { "word": "dang", "count": 0 },
            { "word": "dick", "count": 0 },
            { "word": "fag", "count": 0 },
            { "word": "fuck", "count": 0 },
            { "word": "hell", "count": 0 }
            { "word": "piss", "count": 0 },
            { "word": "shit", "count": 0 },
        ],
        websites: [
            { "site": "https://www.pornhub.com/", "visits": 0 },
            { "site": "https://www.youtube.com/", "visits": 0 },
            { "site": "https://www.facebook.com/", "visits": 0 },
            { "site": "https://www.twitter.com/", "visits": 0 },
        ]  
    }
    if (details.reason == "install") {
        chrome.storage.local.set(defaultSettings, function() {
            alert("Extension successfully installed");
        });
    }
});