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

        // This is the code for extracting the Ougi/Charge Attack
        
        const ougiNames = [];
        const ougiDescript = [];
        var ougiIdx = -1;

        $(".table-container:eq(1)").each(function(i, elem) {
            $(".wikitable>tbody>tr",this).children().each(function (i, elem) {
                if(i > 3) {
                    //console.log(i);
                    if ( (i-1) % 3 === 0 ) {
                        //console.log("")
                        ougiIdx += 1;
                        console.log(ougiIdx)
                    }
                    // Currently will remove all .tooltiptext values (Extra info), want to have a way to add it in a way thats
                    // less intrusive in the future
                    else if ( (i-2) % 3 === 0 ) {
                        ougiNames[ougiIdx] = $(this).text()
                        //console.log($(this).text())
                        console.log(ougiNames[ougiIdx])
                    }
                    else { 
                        //console.log($(".tooltip>tooltiptext", this).remove().end().text()) 
                        $(".tooltip", this).each( function (i, elem) {
                            $(".tooltiptext", this).remove()
                        })
                        ougiDescript[ougiIdx] = $(this).text()
                        //console.log($(this).text())
                        console.log(ougiDescript[ougiIdx])
                    }
                }
            })
        })

        //console.log(ougiDescript.length)

        //This is for getting the skill data
        //Might need to make new form for dual form characters, (specific cases)
        //For dual form charas, most of them have a .table-container length of 9
        //Might be able to make a filter for that

        dform_v = $(".table-container").length
        console.log(dform_v)

        $(".table-container:eq(2)").each (function (i, elem) {
            $(".wikitable>tbody>tr", this).children().each( function (i, elem) {
                if (i === 0 || i > 6) {
                    //Saving skill-set name with i === 0
                    //Maybe have it as a separate branch
                    //console.log(i)
                    //console.log($(this).text())
                }
                
            })
        })

    })
    //error handling
    .catch(err => {
        console.log(err);
    });
}