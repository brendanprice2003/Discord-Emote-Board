
import { emotesArray } from './packs.js';

import {
    createAndShowNotification,
    parseEmote,
    saveEmoteToLocalStorage,
    createAndCopyEmoteURL,
    pushEmoteToDOM
} from './modules.js';


// Utils
const log = console.log.bind(console),
      localStorage = window.localStorage;


// When pack array has been built
document.addEventListener('packBuild', log(emotesArray.content));
document.getElementById('entryField').addEventListener('submit', (event) => event.preventDefault());


// Get value from field on (Enter) keypress
document.getElementById('entryField').onkeydown = function(event) {

    // Get value from field, clear field
    if(event.keyCode == 13) {
        let {emoteID, emoteURL, emoteType} = parseEmote(document.getElementById('entryField').value);
        saveEmoteToLocalStorage(emoteID, emoteURL, emoteType);
        pushEmoteToDOM(emoteID, emoteURL, emoteType);
        document.getElementById('entryField').value = '';
    };
};


// Load and push emotes from local storage
function loadAndPushEmotesFromLocalStorage() {

    Object.keys(json).forEach((key, index) => {
        
        let emoteID = json[index].split('/emojis/')[1].split('.')[0],
            emoteType = json[index].split('/emojis/')[1].split('.')[1].split('?')[0];
        let emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}.${emoteType}?size=48`;
        pushEmoteToDOM(emoteID, emoteURL, emoteType);
    });

    for (let i = 0; i < localStorage.length; i++) {

        let emoteID = localStorage.key(i);
        if (parseInt(emoteID)) {

            let emoteObj = JSON.parse(localStorage.getItem(emoteID));
            pushEmoteToDOM(emoteID, emoteObj.emoteURL, emoteObj.emoteType);
        };
    };

    Object.keys(document.getElementsByClassName('image')).forEach(index => {
        document.getElementsByClassName('image')[index].addEventListener('click', function(e) {
            createAndCopyEmoteURL(this.id);
            createAndShowNotification('Copied!');
        });
    });
};

// Main entry point
// loadAndPushEmotesFromLocalStorage();
