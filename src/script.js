
const log = console.log.bind(console),
      localStorage = window.localStorage,
      sessionStorage = window.sessionStorage;

// Omit refresh on form submit
let form = document.getElementById('entryField');
function handleForm(event) {
    event.preventDefault();
};
form.addEventListener('submit', handleForm);

// Get value from field on (Enter) keypress
document.getElementById('entryField').onkeydown = function(event) {

    if(event.keyCode == 13) {

        // Get value from field
        let {emoteID, emoteURL, emoteType} = parseEmote(document.getElementById('entryField').value);
        saveEmoteToLocalStorage(emoteID, emoteURL, emoteType);
        pushEmoteToDOM(emoteID, emoteURL, emoteType);

        // Clear field
        document.getElementById('entryField').value = '';
    };
};

// Parse emote ID, URL and emote type from the input
function parseEmote(value) {

    let emoteID = value.split('/emojis/')[1].split('.')[0],
        emoteType = value.split('/emojis/')[1].split('.')[1].split('?')[0];

    let emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}.${emoteType}?size=48`;

    return {emoteID, emoteURL, emoteType};
};

// Save emote URL to local storage
function saveEmoteToLocalStorage(emoteID, emoteURL, emoteType) {
    localStorage.setItem(`${emoteID}`, JSON.stringify({emoteURL:emoteURL, emoteType:emoteType}));
};

// Push emote to DOM
function pushEmoteToDOM(emoteID, emoteURL, emoteType) {

    let emote = document.createElement('img');
    emote.className = 'image';
    emote.id = `${emoteID}/${emoteType}`;
    emote.src = emoteURL;
    document.getElementById('imagesContainer').appendChild(emote);
};

// Load and push emotes from local storage
function loadAndPushEmotesFromLocalStorage() {

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

// Create and copy emote URL to clipboard
function createAndCopyEmoteURL(elementID) {
    
    let emoteType = elementID.split('/')[1],
        emoteID = elementID.split('/')[0];
    let emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}.${emoteType}?size=48`;

    // Add emote URL to clipboard
    navigator.clipboard.writeText(emoteURL);
};

// Create and show notification
function createAndShowNotification(notificationMessage) {
    
    let notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = notificationMessage;
    document.body.appendChild(notification);

    // Animation for slide up
    setTimeout(() => {
        notification.classList.add('notificationAnimationCreate');
    });

    // Animation for fade out
    setTimeout(() => {
        notification.classList.add('notificationAnimationRemove');
    }, 3000);
};

loadAndPushEmotesFromLocalStorage();
