const axios = require('axios');
const cheerio = require('cheerio');

const dataTableID = "tabber-c5ab98ed60f590fb853f29967285ae47"
const getElement = require('@util/element-filter.js')

module.exports = async (url) => {
    axios.get(`${url}`).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        var charName = $(".char-name").text();
        var charTitle = $(".tooltip", ".char-title").children().remove().end().text();
        var charID = $('tr>td', ".tabbertab[title='Extra Data']").eq(0).text();
        console.log(`${charName} - ${charTitle}`);
        console.log(`ID: ${charID}`);
        var charRarity = $("a", ".char-rarity").eq(0).attr('title').split(" ")[0];
        //console.log(charRarity);
        var charEle = getElement($('tr>td', ".tabbertab[title='Stats']").eq(2).text());
        //console.log(charEle);

        //To get ougi/charge attack, table is in $(".table-container").eq(1)
        //Figuring out how to extract those values next
        //In JQuery, $(".wikitable>tbody>tr:gt(1)",".table-container:eq(1)").text()
        // $(".wikitable>tbody>tr:gt(1)",".table-container:eq(1)").children().each(function (i, elem) { console.log($(this).text()) })
        // This will get each td and display is, but still has the problem of the children (can prob do the remove stuff from before)
        // Still can't translate it to cheerio tho
        //Will extract all the values for the "ougi", but is unable to split between lines
        //Figure out how to extract for cheerio
        // var charOugi = $(".wikitable>tbody>tr",".table-container:eq(1)").text()
        var test1 = $(".table-container:eq(1)").text()
        console.log(test1)
    })
    //error handling
    .catch(err => {
        console.log(err);
    });
}