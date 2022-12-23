
// Create and show notification
export function createAndShowNotification(notificationMessage) {
    
    let notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = notificationMessage;
    document.body.appendChild(notification);

    // Animation for notification slide up
    setTimeout(() => {
        notification.classList.add('notificationAnimationCreate');
    });

    // Animation for notification fade out
    setTimeout(() => {
        notification.classList.add('notificationAnimationRemove');
    }, 3000);
};


// Parse emote ID, URL and emote type from the input
export function parseEmote(value) {

    let emoteID = value.split('/emojis/')[1].split('.')[0],
        emoteType = value.split('/emojis/')[1].split('.')[1].split('?')[0];
    let emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}.${emoteType}?size=48`;

    return {emoteID, emoteURL, emoteType};
};


// Save emote URL to local storage
export function saveEmoteToLocalStorage(emoteID, emoteURL, emoteType) {
    localStorage.setItem(`${emoteID}`, JSON.stringify({emoteURL:emoteURL, emoteType:emoteType}));
};


// Create and copy emote URL to clipboard
export function createAndCopyEmoteURL(elementID) {
    
    let emoteType = elementID.split('/')[1],
        emoteID = elementID.split('/')[0];
    let emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}.${emoteType}?size=48`;

    // Add emote URL to clipboard
    navigator.clipboard.writeText(emoteURL);
};


// Push emote to DOM
export function pushEmoteToDOM(emoteID, emoteURL, emoteType) {

    let emote = document.createElement('img');
    emote.className = 'image';
    emote.id = `${emoteID}/${emoteType}`;
    emote.src = emoteURL;
    document.getElementById('imagesContainer').appendChild(emote);
};