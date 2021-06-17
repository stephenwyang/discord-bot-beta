const axios = require('axios');
const cheerio = require('cheerio');

const dataTableID = "tabber-c5ab98ed60f590fb853f29967285ae47"

module.exports = async (url) => {
    axios.get(`${url}`).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        var charName = $(".char-name").text();
        var charTitle = $(".tooltip", ".char-title").children().remove().end().text();
        var charID = $('tr>td', ".tabbertab[title='Extra Data']").eq(0).text()
        console.log(`${charName} - ${charTitle}`)
        console.log(`ID: ${charID}`)
        var charRarity = $("a", ".char-rarity").eq(0).attr('title').split(" ")[0];
        console.log(charRarity)
    })
    //error handling
    .catch(err => {
        console.log(err);
    });
}