
import def from '../packs/default.json';
import cats1 from '../packs/meme/cat1.json';
import meme1 from '../packs/meme/meme1.json';
import meme2 from '../packs/meme/meme2.json';
import snow1 from '../packs/discord/snow-2021.json';
import snow2 from '../packs/discord/snow-2022.json';
import pepesign1 from '../packs/pepe/pepesign1.json';
import anime1 from '../packs/anime/anime1.json';
import anime2 from '../packs/anime/anime2.json';
import pokemon from '../packs/anime/pokemon.json';

export var importTable = [def, cats1, meme1, meme2, snow1, snow2, pepesign1, anime1, anime2, pokemon];
export var emotesArray = {
    content: {},
    updateEmotes: function(emote, id) {
        this.content[id] = emote;
    }
};

const packBuildEvent = new Event('packBuild');

importTable.forEach((obj, index) => {
    emotesArray.updateEmotes({metadata: obj.metadata, content: obj.content || {}}, index);
});

document.dispatchEvent(packBuildEvent);
